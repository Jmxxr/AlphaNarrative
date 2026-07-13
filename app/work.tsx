const projects = [
  {
    name: "PayTrack",
    description: "Contribution management for ajo/esusu cooperative savings groups.",
  },
  {
    name: "Chassé",
    description: "A commerce aggregation layer for Nigerian SMEs.",
  },
  {
    name: "FlowDesk",
    description: "AI-powered content and workflow tooling for modern teams.",
  },
];

export default function Work() {
  return (
    <section id="work" className="bg-black text-white px-6 py-24 border-t border-gray-800">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 text-center">
          Work
        </p>
        <h2 className="text-3xl font-bold mb-12 text-center">
          What we're building
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className="border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}