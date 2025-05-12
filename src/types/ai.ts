export interface IEvaluate {
  cv_id: string
  sections: ISections[]
}

export interface ISections {
  section: string
  content_score: number
  final_score: number
  grammar_errors: {
    minor: number
    severe: number
  }
  grammar_errors_detailed?: [
    {
      location: string
      type: string
      description: string
      suggestion: string
    },
  ]
  suggestions: [
    {
      issue: string
      suggestion: string
    },
  ]
  quality: string
}
