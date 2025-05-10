export interface ITemplate {
  id: string
  lngCode: string
  isPremium: boolean
  createdAt: string
  updatedAt: string
  status: string
  summary: string
  personalDetails: IPersonalDetail
  content: IContent
}

export interface IPersonalDetail {
  fullname: string
  phoneNumber: string
  address: string
  birthday: string
  email: string
  avatar: string
  jobTitle: string
  socials: Isocial[]
}

export interface Isocial {
  icon: string
  link: string
}

export interface IContent {
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

export interface IEducation {
  degree: string
  school: string
  startDate: string
  endDate: string
  schoolLink: string
  city: string
  GPA: number
  description: string
}

export interface IAward {
  awardTitle: string
  awardTitleLink: string
  issuer: string
  issuedDate: string
}

export interface ILanguage {
  language: string
  proficiency: string
}

export interface ISkill {
  skillCategory: string
  ListOfSkill: string
}

export interface IWork {
  companyName: string
  iscurrentWorking: boolean
  position: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface IProject {
  projectName: string
  projectLink: string
  startDate: string
  endDate: string
  description: string
}
export interface ICertification {
  certificationName: string
  issuingOrganization: string
  issuedDate: string
  certificationLink: string
  credentialId: string
}

export interface IPublication {
  title: string
  publisher: string
  url: string
  publicationDate: string
  description: string
}

export interface IOrganization {
  name: string
  position: string
  address: string
  startDate: string
  endDate: string
  description: string
}
