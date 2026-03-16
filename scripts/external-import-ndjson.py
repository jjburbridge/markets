#!/usr/bin/env python3
"""
Fetches users and posts from JSONPlaceholder API and outputs Sanity-ready documents as NDJSON.
Equivalent to external-import.ts but writes to a file instead of importing to Sanity.

Usage:
  python scripts/external-import-ndjson.py [--output FILE]
  python scripts/external-import-ndjson.py --output data.ndjson

Default output: external-import.ndjson
"""

import argparse
import json
import sys
import time
from urllib.request import urlopen

USERS_URL = "https://jsonplaceholder.typicode.com/users"
POSTS_URL = "https://jsonplaceholder.typicode.com/posts"


def fetch_json(url: str) -> list:
    with urlopen(url) as resp:
        return json.load(resp)


def build_docs(users_data: list, posts_data: list) -> list[dict]:
    docs = []

    for user in users_data:
        addr = user.get("address", {})
        geo = addr.get("geo", {})
        company = user.get("company", {})

        docs.append({
            "_id": f"user-{user['id']}",
            "_type": "user",
            "name": user.get("name"),
            "email": user.get("email"),
            "phone": user.get("phone"),
            "address": {
                "street": addr.get("street"),
                "suite": addr.get("suite"),
                "city": addr.get("city"),
                "zipcode": addr.get("zipcode"),
                "geo": {
                    "_type": "geopoint",
                    "lat": float(geo.get("lat", 0)),
                    "lng": float(geo.get("lng", 0)),
                },
            },
            "website": user.get("website"),
            "company": {
                "name": company.get("name"),
                "catchPhrase": company.get("catchPhrase"),
                "bs": company.get("bs"),
            },
        })

    for post in posts_data:
        docs.append({
            "_id": f"post-{post['id']}",
            "_type": "post",
            "title": post.get("title"),
            "body": post.get("body"),
            "user": {
                "_type": "reference",
                "_ref": f"user-{post['userId']}",
            },
        })

    return docs


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fetch JSONPlaceholder data and output Sanity documents as NDJSON"
    )
    parser.add_argument(
        "-o", "--output",
        default="external-import.ndjson",
        help="Output NDJSON file path (default: external-import.ndjson)",
    )
    args = parser.parse_args()

    print("Fetching users...", file=sys.stderr)
    users_data = fetch_json(USERS_URL)
    time.sleep(0.5)

    print("Fetching posts...", file=sys.stderr)
    posts_data = fetch_json(POSTS_URL)

    docs = build_docs(users_data, posts_data)

    with open(args.output, "w") as f:
        for doc in docs:
            f.write(json.dumps(doc, ensure_ascii=False) + "\n")

    print(f"Wrote {len(docs)} documents to {args.output}", file=sys.stderr)
    print(f"  {len(users_data)} users, {len(posts_data)} posts", file=sys.stderr)


if __name__ == "__main__":
    main()
