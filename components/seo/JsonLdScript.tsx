interface JsonLdScriptProps {
  id: string;
  type: "application/ld+json";
  dangerouslySetInnerHTML: { __html: string };
}

/** Emits JSON-LD in the initial HTML instead of deferring it to hydration. */
export default function JsonLdScript(props: JsonLdScriptProps) {
  return <script {...props} />;
}
