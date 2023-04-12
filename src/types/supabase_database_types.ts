export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName: string
          query: string
          variables: Json
          extensions: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      company: {
        Row: {
          company_id: string
          company_name: string | null
        }
        Insert: {
          company_id?: string
          company_name?: string | null
        }
        Update: {
          company_id?: string
          company_name?: string | null
        }
      }
      company_note: {
        Row: {
          company_id: string
          customer_id: string | null
          note_content: string
          note_id: string
          note_title: string
        }
        Insert: {
          company_id: string
          customer_id?: string | null
          note_content?: string
          note_id?: string
          note_title?: string
        }
        Update: {
          company_id?: string
          customer_id?: string | null
          note_content?: string
          note_id?: string
          note_title?: string
        }
      }
      customer: {
        Row: {
          company_id: string
          customer_email: string | null
          customer_id: string
          phone_number: number | null
          status: Database["public"]["Enums"]["prospect_status"]
          type: Database["public"]["Enums"]["customer_type"]
        }
        Insert: {
          company_id: string
          customer_email?: string | null
          customer_id?: string
          phone_number?: number | null
          status?: Database["public"]["Enums"]["prospect_status"]
          type?: Database["public"]["Enums"]["customer_type"]
        }
        Update: {
          company_id?: string
          customer_email?: string | null
          customer_id?: string
          phone_number?: number | null
          status?: Database["public"]["Enums"]["prospect_status"]
          type?: Database["public"]["Enums"]["customer_type"]
        }
      }
      customer_email: {
        Row: {
          customer_id: string
          date: string
          email_header: string
          email_id: string
          email_text: string
        }
        Insert: {
          customer_id: string
          date?: string
          email_header?: string
          email_id?: string
          email_text?: string
        }
        Update: {
          customer_id?: string
          date?: string
          email_header?: string
          email_id?: string
          email_text?: string
        }
      }
      customer_interaction: {
        Row: {
          customer_id: string
          date: string
          meeting_id: string
          meeting_notes: string | null
          transcript: string | null
        }
        Insert: {
          customer_id: string
          date?: string
          meeting_id?: string
          meeting_notes?: string | null
          transcript?: string | null
        }
        Update: {
          customer_id?: string
          date?: string
          meeting_id?: string
          meeting_notes?: string | null
          transcript?: string | null
        }
      }
      customer_permission: {
        Row: {
          company_id: string
          customer_id: string
          user_id: string
        }
        Insert: {
          company_id: string
          customer_id: string
          user_id: string
        }
        Update: {
          company_id?: string
          customer_id?: string
          user_id?: string
        }
      }
      user: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          is_company_admin: boolean
          is_system_admin: boolean
          user_id: string
          username: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          is_company_admin?: boolean
          is_system_admin?: boolean
          user_id?: string
          username: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          is_company_admin?: boolean
          is_system_admin?: boolean
          user_id?: string
          username?: string
        }
      }
      user_note: {
        Row: {
          note_content: string
          note_id: string
          note_title: string
          user_id: string
        }
        Insert: {
          note_content?: string
          note_id?: string
          note_title?: string
          user_id: string
        }
        Update: {
          note_content?: string
          note_id?: string
          note_title?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      customer_type: "customer" | "prospect"
      prospect_status:
        | "Awareness"
        | "Consideration"
        | "Preference"
        | "Purchase"
        | "Loyalty"
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: { size: number; bucket_id: string }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits: number
          levels: number
          offsets: number
          search: string
          sortcolumn: string
          sortorder: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

