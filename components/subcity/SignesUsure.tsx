import { siteConfig } from "@/config/site";

interface SigneItem {
  icon: string;
  signe: string;
  description: string;
  urgence: string;
}

interface SignesUsureProps {
  title: string;
  subtitle: string;
  items: SigneItem[];
  zoneName: string;
}

const urgenceLabel: Record<string, { text: string; color: string }> = {
  "Moyen": { text: "Moyen", color: "text-primary-600" },
  "Élevé": { text: "Élevé", color: "text-orange-600" },
  "Urgent": { text: "Urgent", color: "text-red-500" },
};

export function SignesUsure({ title, subtitle, items, zoneName }: SignesUsureProps) {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-xl mb-14">
          <div className="rule-accent mb-6" />
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-gray-200 max-w-4xl">
          {items.map((item, index) => {
            const label = urgenceLabel[item.urgence] || urgenceLabel["Moyen"];
            return (
              <div key={index} className="bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="font-bold text-2xl text-gray-200 leading-none mt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-gray-900 text-[15px]">{item.signe}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${label.color}`}>
                        {label.text}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 max-w-2xl border border-red-100 p-6" style={{ borderRadius: '8px' }}>
          <p className="font-heading font-bold text-gray-900 text-sm mb-2">
            Vous constatez un de ces signes à {zoneName} ?
          </p>
          <p className="text-gray-400 text-xs mb-4">
            N&apos;attendez pas qu&apos;une petite usure devienne une grosse panne.
          </p>
          <a href={siteConfig.phoneLink} className="btn-phone text-sm">
            Diagnostic gratuit : {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
