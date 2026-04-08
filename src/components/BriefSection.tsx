"use client";

type BriefSectionProps = {
  title: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  onBlur?: () => void;
};

export function BriefSection({
  title,
  description,
  value,
  onChange,
  readOnly,
  onBlur,
}: BriefSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        {description ? (
          <p className="mt-0.5 text-xs text-[#888888]">{description}</p>
        ) : null}
      </div>
      <textarea
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={readOnly ? 6 : 5}
        className="min-h-[120px] w-full resize-y rounded-lg border border-[#1A1A1A] bg-[#0F0F0F] px-3 py-2 text-sm text-white placeholder:text-[#555555] focus:border-[#7BC8D8] focus:outline-none focus:ring-1 focus:ring-[#7BC8D8] disabled:cursor-not-allowed read-only:text-[#AAAAAA]"
        placeholder={readOnly ? "AI suggestions appear here when you save from chat." : "Write here…"}
      />
    </div>
  );
}
