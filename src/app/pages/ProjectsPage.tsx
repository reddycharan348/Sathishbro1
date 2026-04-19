import { ProjectsSection } from '../components/ProjectsSection';
import { ProjectIdeasSection } from '../components/ProjectIdeasSection';

export function ProjectsPage() {
  return (
    <div>
      <ProjectIdeasSection />
      <ProjectsSection />
    </div>
  );
}