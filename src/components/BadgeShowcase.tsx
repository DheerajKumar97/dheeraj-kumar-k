import powerBiBadge from "@/assets/power-bi-badge.png";
import tableauAnalystBadge from "@/assets/tableau-analyst-badge.png";
import tableauSpecialistBadge from "@/assets/tableau-specialist-badge.png";

const BadgeShowcase = () => {
  const badges = [
    {
      name: "Power BI Data Analyst Associate",
      image: powerBiBadge,
      issuer: "Microsoft",
    },
    {
      name: "Tableau Data Analyst",
      image: tableauAnalystBadge,
      issuer: "Tableau",
    },
    {
      name: "Tableau Desktop Specialist",
      image: tableauSpecialistBadge,
      issuer: "Tableau",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">
            Certified Professional
          </h3>
          <p className="text-sm text-muted-foreground">
            Industry-recognized credentials in Data Analytics & Business Intelligence
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={badge.image}
                  alt={`${badge.name} - ${badge.issuer} Certification Badge`}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  title={badge.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BadgeShowcase;
