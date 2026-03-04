type StructuredDataProps = {
  data: Record<string, unknown>;
};

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON in script body.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
