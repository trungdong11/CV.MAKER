export interface ITemplate {
  id: string
  created_at: string
  updated_at: string
  summary: string
  personal_details: IPersonalDetails
  socials: ISocial[]
  education: IEducation[]
  award: IAward[]
  languages: ILanguage[]
  skills: ISkill[]
  works: IWork[]
  projects: IProject[]
  certification: ICertification[]
  publication: IPublication[]
  organization: IOrganization[]
}

interface IOrganization {
  name: string
  position: string
  address: string
  start_date: string
  end_date: string
  description: string
}

interface IPublication {
  title: string
  publisher: string
  url: string
  publication_date: string
  description: string
}

interface ICertification {
  certification_name: string
  issuing_organization: string
  issued_date: string
  certification_link: string
  credential_id: string
}

interface IProject {
  project_name: string
  project_link: string
  start_date: string
  end_date: string
  description: string
  is_ongoing: boolean
}

interface IWork {
  company_name: string
  is_current_working: boolean
  position: string
  location: string
  start_date: string
  end_date: string
  description: string
}

interface ISkill {
  skill_category: string
  list_of_skill: string
}

interface ILanguage {
  language: string
  proficiency: string
}

interface IAward {
  award_title: string
  award_title_link: string
  issued_by: string
  issued_date: string
  description: string
}

interface IEducation {
  degree: string
  school: string
  start_date: string
  end_date: string
  school_link: string
  city: string
  gpa: number
  description: string
}

interface ISocial {
  icon: string
  link: string
}

interface IPersonalDetails {
  full_name: string
  phone_number: string
  address: string
  birthday: string
  email: string
  avatar: string
  job_title: string
}
