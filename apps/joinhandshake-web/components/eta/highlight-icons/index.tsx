import { LeadershipOpportunities } from "./leadership-opportunities"
import { NetworkingOpportunities } from "./networking-opportunities"
import { ShadowingOpportunities } from "./shadowing-opportunities"
import { Challenging } from "./challenging"
import { Collaborative } from "./collaborative"
import { Established } from "./established"
import { FlexibleWorkEnvironment } from "./flexible-work-environment"
import { FocusedTasks } from "./focused-tasks"
import { Friendly } from "./friendly"
import { HighPerformance } from "./high-performance"
import { HousingStipend } from "./housing-stipend"
import { InspiringLeadership } from "./inspiring-leadership"
import { LightWorkload } from "./light-workload"
import { ManagersAreGoodMentors } from "./managers-are-good-mentors"
import { ManagersCareAboutYou } from "./managers-care-about-you"
import { MissionDriven } from "./mission-driven"
import { OwnedMyOwnProject } from "./owned-my-own-project"
import { SocialEventsOutsideWork } from "./social-events-outside-work"
import { SociallyResponsible } from "./socially-responsible"
import { SocietallyImpactful } from "./societally-impactful"
import { StructuredMentorshipPrograms } from "./structured-mentorship-programs"
import { Supportive } from "./supportive"
import { ValuesFeedback } from "./values-feedback"

const icons = {
  LeadershipOpportunities,
  NetworkingOpportunities,
  ShadowingOpportunities,
  Challenging,
  Collaborative,
  Established,
  FlexibleWorkEnvironment,
  FocusedTasks,
  Friendly,
  HighPerformance,
  HousingStipend,
  InspiringLeadership,
  LightWorkload,
  ManagersAreGoodMentors,
  ManagersCareAboutYou,
  MissionDriven,
  OwnedMyOwnProject,
  SocialEventsOutsideWork,
  SociallyResponsible,
  SocietallyImpactful,
  StructuredMentorshipPrograms,
  Supportive,
  ValuesFeedback,
}

export type IconVariant = keyof typeof icons

export { icons }
