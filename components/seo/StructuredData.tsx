/**
 * Structured Data Component
 * Injects JSON-LD structured data into page head for AI search optimization
 */

interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
}

export default function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  );
}
