import { useDocumentProjection } from "@sanity/sdk-react";
import { Badge, Checkbox, Flex, Text } from "@sanity/ui";
import { useRef } from "react";
import { useApp } from "../../contexts/AppContext";
import { useLanguages } from "../../hooks/useLanguages";
import { DOCUMENT_PREVIEW_QUERY } from "../../queries/documentQueries";
import SanityImage from "../SanityImage";
import TranslationStatusBadge from "../TranslationStatusBadge";

type DocumentPreviewData = {
  _id: string;
  title: string | null;
  language: string | null;
  mainImage?: any;
  _translationStatus: "none" | "partial" | "fully translated" | null;
  _translations: any[];
};

const DocumentPreviewItem = (props: any) => {
  const languages = useLanguages();
  const previewRef = useRef<HTMLDivElement>(null);
  const { isBatchMode, selectedDocuments, toggleDocumentSelection } = useApp();
  const { data, isPending } = useDocumentProjection<DocumentPreviewData>({
    ...props,
    ref: previewRef,
    projection: DOCUMENT_PREVIEW_QUERY,
  });

  const showPlaceholder = isPending && !data;
  // Check both the document ID and the props documentId to handle draft/published differences
  const documentId = props.documentId || data?._id;
  const isSelected = documentId && selectedDocuments.includes(documentId);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent event bubbling since the whole item is now clickable
    event.stopPropagation();
  };
  return (
    <Flex
      gap={3}
      justify="space-between"
      align="center"
      style={{ width: "100%" }}
    >
      <Flex gap={2} align="center" style={{ flex: 1, minWidth: 0 }}>
        {isBatchMode && (
          <Checkbox
            checked={isSelected || false}
            onChange={handleCheckboxChange}
          />
        )}

        <SanityImage
          image={data?.mainImage}
          alt={data?.title || "Document image"}
          width={40}
          height={40}
        />

        <Text weight="medium" style={{}}>
          {showPlaceholder ? "..." : data?.title || "Untitled"}
        </Text>

        {data?.language && (
          <Text size={0} muted style={{ whiteSpace: "nowrap" }}>
            <Badge
              tone="primary"
              radius={4}
              padding={2}
              fontSize={1}
              style={{ whiteSpace: "nowrap" }}
            >
              {data.language}
            </Badge>
          </Text>
        )}
      </Flex>
      {data?._id?.includes("drafts.") && (
        <span
          className={`w-1.5 h-1.5 flex rounded-full ${data?._id?.includes("drafts") ? "bg-[var(--card-badge-caution-dot-color)]" : "bg-[var(--card-badge-positive-dot-color)]"}`}
        />
      )}
      <TranslationStatusBadge
        translationStatus={data?._translationStatus}
        languages={languages}
        translations={data?._translations}
        showPlaceholder={showPlaceholder}
      />
    </Flex>
  );
};

export default DocumentPreviewItem;
