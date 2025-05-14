export interface ITemplate {
  createdAt: string
  updatedAt: string
  summary: string
  personalDetails: IPersonalDetails
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
  startDate: string
  endDate: string
  description: string
}

interface IPublication {
  title: string
  publisher: string
  url: string
  publicationDate: string
  description: string
}

interface ICertification {
  certificationName: string
  issuingOrganization: string
  issuedDate: string
  certificationLink: string
  credentialId: string
}

interface IProject {
  projectName: string
  projectLink: string
  startDate: string
  endDate: string
  description: string
}

interface IWork {
  companyName: string
  isCurrentWorking: boolean
  position: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface ISkill {
  skillCategory: string
  listOfSkill: string
}

interface ILanguage {
  language: string
  proficiency: string
}

interface IAward {
  awardTitle: string
  awardTitleLink: string
  issuer: string
  issuedDate: string
  description: string
}

interface IEducation {
  degree: string
  school: string
  startDate: string
  endDate: string
  schoolLink: string
  city: string
  GPA: number
  description: string
}

interface ISocial {
  icon: string
  link: string
}

interface IPersonalDetails {
  fullname: string
  phoneNumber: string
  address: string
  birthday: string
  email: string
  avatar: string
  jobTitle: string
}
