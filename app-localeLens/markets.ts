/*
This is a hardcoded config for markets as this is needed for creating the separate studio configs.
Languages can still be dynamic as the plugins accept an async function to get the supported languages, but i have included them here for now.
*/
const markets = [
  {
    flag: `🇺🇸`,
    name: `US`,
    title: `USA`,
    languages: [{id: `en`, title: `English`}],
  },
  {
    flag: `🇨🇦`,
    name: `CA`,
    title: `Canada`,
    languages: [
      {id: `en`, title: `English`},
      {id: `fr`, title: `French`},
    ],
  },
  {
    flag: `🇬🇧`,
    name: `UK`,
    title: `United Kingdom`,
    languages: [{id: `en`, title: `English`}],
  },
  {
    flag: `🇮🇳`,
    name: `IN`,
    title: `India`,
    languages: [
      {id: `en`, title: `English`},
      {id: `hi`, title: `Hindi`},
    ],
  },
  {
    flag: `🇯🇵`,
    name: `JP`,
    title: `Japan`,
    languages: [
      {id: `jp`, title: `Japanese`},
      {id: `en`, title: `English`},
    ],
  },
]

export type Language = {
  id: string
  title: string
}
export type Market = {
  name: string
  flag: string
  title: string
  languages: Language[]
}

export const MARKETS: Market[] = markets

export const uniqueLanguages = Array.from(
  new Set(
    markets
      .map((market) => market.languages.map((language) => [language.id, market.name].join(`-`)))
      .flat(),
  ),
)

export const uniqueLanguagesObject = MARKETS.reduce((acc: Language[], cur: Market) => {
  const newLanguages = cur.languages.filter((lang) => !acc.find((a) => a.id === lang.id))

  return [...acc, ...newLanguages]
}, [])
