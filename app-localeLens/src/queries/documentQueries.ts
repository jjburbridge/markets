import { defineQuery } from 'groq';

export const DOCUMENT_PREVIEW_QUERY = defineQuery(`{
  _createdAt,
  _id,
  title,
  author,
  language,
  mainImage,
  "_translations": *[
    _type == "translation.metadata"
    && references(^._id)
  ].translations[].value->{
    _id,
    title,
    slug,
    language,
    mainImage
  },
  "_translationStatus": select(
    count(*[
      _type == "translation.metadata"
      && references(^._id)
    ].translations[].value) == 0 => "none",
    count(*[
      _type == "translation.metadata"
      && references(^._id)
    ].translations[].value) == count(*[_type == "locale"]) => "fully translated",
    true => "partial"
  ),
}`);

export const DOCUMENT_DETAIL_QUERY = defineQuery(`{
  _createdAt,
  _id,
  title,
  language,
  mainImage,
  "_translations": *[
    _type == "translation.metadata"
    && references(^._id)
  ].translations[].value->{
    _id,
    title,
    language,
    mainImage
  },
  "_translationMetadataId": *[
    _type == "translation.metadata"
    && references(^._id)
  ]._id,
  "_translationStatus": select(
    count(*[
      _type == "translation.metadata"
      && references(^._id)
    ].translations[].value) == 0 => "none",
    count(*[
      _type == "translation.metadata"
      && references(^._id)
    ].translations[].value) == count(*[_type == "locale"]) => "fully translated",
    true => "partial"
  ),
}`);


export const BATCH_DOCUMENT_PREVIEW_QUERY = defineQuery(`{
  _id,
  "_translations": *[
    _type == "translation.metadata"
    && references(^._id)
  ].translations[].value->{
    _id,
    title,
    slug,
    language,
    mainImage
  },
}`);
