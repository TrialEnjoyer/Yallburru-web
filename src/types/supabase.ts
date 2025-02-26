// disable eslint for this file
/* eslint-disable */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string
          description: string | null
          id: number
          imageurl: string | null
          keywords: string[] | null
          published: boolean
          resources: Array<{
            type: string
            title: string
            html?: string
            image?: string
            url?: string
            text?: string
            description?: string
          }> | null
          slug: string
          subcategory: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string
          description?: string | null
          id?: number
          imageurl?: string | null
          keywords?: string[] | null
          published?: boolean
          resources?: Array<{
            type: string
            title: string
            html?: string
            image?: string
            url?: string
            text?: string
            description?: string
          }> | null
          slug: string
          subcategory?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          description?: string | null
          id?: number
          imageurl?: string | null
          keywords?: string[] | null
          published?: boolean
          resources?: Array<{
            type: string
            title: string
            html?: string
            image?: string
            url?: string
            text?: string
            description?: string
          }> | null
          slug?: string
          subcategory?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      Contact_Submissions: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: number
          last_name: string
          message: string
          phone: string | null
          preferred_contact: string
          read: boolean
          removed: boolean
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: number
          last_name: string
          message: string
          phone?: string | null
          preferred_contact: string
          read?: boolean
          removed?: boolean
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          message?: string
          phone?: string | null
          preferred_contact?: string
          read?: boolean
          removed?: boolean
          status?: string
          subject?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          alt_text: string | null
          created_at: string
          description: string | null
          filename: string
          id: string
          modified: boolean | null
          original_id: string | null
          owner: string | null
          owner_id: string | null
          size: number
          tags: string[] | null
          url: string
          user_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          description?: string | null
          filename: string
          id?: string
          modified?: boolean | null
          original_id?: string | null
          owner?: string | null
          owner_id?: string | null
          size: number
          tags?: string[] | null
          url: string
          user_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          description?: string | null
          filename?: string
          id?: string
          modified?: boolean | null
          original_id?: string | null
          owner?: string | null
          owner_id?: string | null
          size?: number
          tags?: string[] | null
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_original_id_fkey"
            columns: ["original_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      Yallburru_Email_List: {
        Row: {
          created_at: string
          email: string
          id: number
          subscribed: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          subscribed?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          subscribed?: boolean
        }
        Relationships: []
      }
      schedules: {
        Row: {
          id: string
          title: string
          description: string | null
          start_time: string
          end_time: string
          location: string | null
          category: string | null
          created_at: string
          updated_at: string
          created_by: string
          status: string
          recurring_rule: { [key: string]: any } | null
          metadata: { [key: string]: any } | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_time: string
          end_time: string
          location?: string | null
          category?: string | null
          created_at?: string
          updated_at?: string
          created_by: string
          status?: string
          recurring_rule?: { [key: string]: any } | null
          metadata?: { [key: string]: any } | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          location?: string | null
          category?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string
          status?: string
          recurring_rule?: { [key: string]: any } | null
          metadata?: { [key: string]: any } | null
        }
        Relationships: [
          {
            foreignKeyName: "schedules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
