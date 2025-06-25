export interface IEvaluate {
  id: string
  name_cv: string
  created_at: string
  updated_at: string
  total_content_score: number
  total_final_score: number
  content_score_100: number
  final_score_100: number
  total_grammar_errors: number
  sections: [
    {
      section: string
      content_score: number
      final_score: number
      grammar_errors: IGrammarError
      grammar_errors_detailed: [
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
    },
  ]
}

export interface IGrammarError {
  location: string
  type: string
  description: string
  suggestion: string
}
