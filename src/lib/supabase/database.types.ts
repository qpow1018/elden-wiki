// Generated from the local public schema with `supabase gen types --local --schema public`.
// Type identifiers use the project T prefix.

export type TJson =
  string | number | boolean | null | { [key: string]: TJson | undefined } | TJson[];

export type TDatabase = {
  public: {
    Tables: {
      armor_details: {
        Row: {
          focus: number | null;
          game_item_id: number;
          immunity: number | null;
          negation_fire: number | null;
          negation_holy: number | null;
          negation_lightning: number | null;
          negation_magic: number | null;
          negation_physical: number | null;
          negation_pierce: number | null;
          negation_slash: number | null;
          negation_strike: number | null;
          poise: number | null;
          robustness: number | null;
          type: TDatabase['public']['Enums']['game_item_type'];
          vitality: number | null;
          weight: number | null;
        };
        ComputedFields: never;
        Insert: {
          focus?: number | null;
          game_item_id: number;
          immunity?: number | null;
          negation_fire?: number | null;
          negation_holy?: number | null;
          negation_lightning?: number | null;
          negation_magic?: number | null;
          negation_physical?: number | null;
          negation_pierce?: number | null;
          negation_slash?: number | null;
          negation_strike?: number | null;
          poise?: number | null;
          robustness?: number | null;
          type?: TDatabase['public']['Enums']['game_item_type'];
          vitality?: number | null;
          weight?: number | null;
        };
        Update: {
          focus?: number | null;
          game_item_id?: number;
          immunity?: number | null;
          negation_fire?: number | null;
          negation_holy?: number | null;
          negation_lightning?: number | null;
          negation_magic?: number | null;
          negation_physical?: number | null;
          negation_pierce?: number | null;
          negation_slash?: number | null;
          negation_strike?: number | null;
          poise?: number | null;
          robustness?: number | null;
          type?: TDatabase['public']['Enums']['game_item_type'];
          vitality?: number | null;
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'armor_details_game_item_id_type_fkey';
            columns: ['game_item_id', 'type'];
            isOneToOne: false;
            referencedRelation: 'game_items';
            referencedColumns: ['id', 'type'];
          },
        ];
      };
      ash_of_war_details: {
        Row: {
          applicable_armaments_text: string | null;
          game_item_id: number;
          native_affinity: string | null;
          skill_id: number | null;
          type: TDatabase['public']['Enums']['game_item_type'];
        };
        ComputedFields: never;
        Insert: {
          applicable_armaments_text?: string | null;
          game_item_id: number;
          native_affinity?: string | null;
          skill_id?: number | null;
          type?: TDatabase['public']['Enums']['game_item_type'];
        };
        Update: {
          applicable_armaments_text?: string | null;
          game_item_id?: number;
          native_affinity?: string | null;
          skill_id?: number | null;
          type?: TDatabase['public']['Enums']['game_item_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'ash_of_war_details_game_item_id_type_fkey';
            columns: ['game_item_id', 'type'];
            isOneToOne: false;
            referencedRelation: 'game_items';
            referencedColumns: ['id', 'type'];
          },
          {
            foreignKeyName: 'ash_of_war_details_skill_id_fkey';
            columns: ['skill_id'];
            isOneToOne: false;
            referencedRelation: 'weapon_skills';
            referencedColumns: ['id'];
          },
        ];
      };
      game_item_categories: {
        Row: {
          id: number;
          name: string;
          sort_order: number;
          type: TDatabase['public']['Enums']['game_item_type'];
        };
        ComputedFields: never;
        Insert: {
          id?: never;
          name: string;
          sort_order: number;
          type: TDatabase['public']['Enums']['game_item_type'];
        };
        Update: {
          id?: never;
          name?: string;
          sort_order?: number;
          type?: TDatabase['public']['Enums']['game_item_type'];
        };
        Relationships: [];
      };
      game_items: {
        Row: {
          category_id: number;
          content_code: string;
          effect_description: string | null;
          game_description: string | null;
          id: number;
          image_url: string | null;
          name: string;
          sort_order: number;
          type: TDatabase['public']['Enums']['game_item_type'];
        };
        ComputedFields: never;
        Insert: {
          category_id: number;
          content_code: string;
          effect_description?: string | null;
          game_description?: string | null;
          id?: never;
          image_url?: string | null;
          name: string;
          sort_order: number;
          type: TDatabase['public']['Enums']['game_item_type'];
        };
        Update: {
          category_id?: number;
          content_code?: string;
          effect_description?: string | null;
          game_description?: string | null;
          id?: never;
          image_url?: string | null;
          name?: string;
          sort_order?: number;
          type?: TDatabase['public']['Enums']['game_item_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'game_items_category_id_type_fkey';
            columns: ['category_id', 'type'];
            isOneToOne: false;
            referencedRelation: 'game_item_categories';
            referencedColumns: ['id', 'type'];
          },
        ];
      };
      spell_details: {
        Row: {
          fp_cost_text: string | null;
          game_item_id: number;
          required_arcane: number | null;
          required_faith: number | null;
          required_intelligence: number | null;
          slots_used: number | null;
          type: TDatabase['public']['Enums']['game_item_type'];
        };
        ComputedFields: never;
        Insert: {
          fp_cost_text?: string | null;
          game_item_id: number;
          required_arcane?: number | null;
          required_faith?: number | null;
          required_intelligence?: number | null;
          slots_used?: number | null;
          type?: TDatabase['public']['Enums']['game_item_type'];
        };
        Update: {
          fp_cost_text?: string | null;
          game_item_id?: number;
          required_arcane?: number | null;
          required_faith?: number | null;
          required_intelligence?: number | null;
          slots_used?: number | null;
          type?: TDatabase['public']['Enums']['game_item_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'spell_details_game_item_id_type_fkey';
            columns: ['game_item_id', 'type'];
            isOneToOne: false;
            referencedRelation: 'game_items';
            referencedColumns: ['id', 'type'];
          },
        ];
      };
      talisman_details: {
        Row: {
          game_item_id: number;
          type: TDatabase['public']['Enums']['game_item_type'];
          weight: number | null;
        };
        ComputedFields: never;
        Insert: {
          game_item_id: number;
          type?: TDatabase['public']['Enums']['game_item_type'];
          weight?: number | null;
        };
        Update: {
          game_item_id?: number;
          type?: TDatabase['public']['Enums']['game_item_type'];
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'talisman_details_game_item_id_type_fkey';
            columns: ['game_item_id', 'type'];
            isOneToOne: false;
            referencedRelation: 'game_items';
            referencedColumns: ['id', 'type'];
          },
        ];
      };
      weapon_details: {
        Row: {
          attack_fire: number | null;
          attack_holy: number | null;
          attack_lightning: number | null;
          attack_magic: number | null;
          attack_physical: number | null;
          bleed: number | null;
          can_change_affinity: boolean | null;
          critical: number | null;
          default_skill_id: number | null;
          frostbite: number | null;
          game_item_id: number;
          guard_boost: number | null;
          guard_fire: number | null;
          guard_holy: number | null;
          guard_lightning: number | null;
          guard_magic: number | null;
          guard_physical: number | null;
          madness: number | null;
          physical_attack_types: string[] | null;
          poison: number | null;
          required_arcane: number | null;
          required_dexterity: number | null;
          required_faith: number | null;
          required_intelligence: number | null;
          required_strength: number | null;
          scarlet_rot: number | null;
          sleep: number | null;
          type: TDatabase['public']['Enums']['game_item_type'];
          upgrade_material: string | null;
          weight: number | null;
        };
        ComputedFields: never;
        Insert: {
          attack_fire?: number | null;
          attack_holy?: number | null;
          attack_lightning?: number | null;
          attack_magic?: number | null;
          attack_physical?: number | null;
          bleed?: number | null;
          can_change_affinity?: boolean | null;
          critical?: number | null;
          default_skill_id?: number | null;
          frostbite?: number | null;
          game_item_id: number;
          guard_boost?: number | null;
          guard_fire?: number | null;
          guard_holy?: number | null;
          guard_lightning?: number | null;
          guard_magic?: number | null;
          guard_physical?: number | null;
          madness?: number | null;
          physical_attack_types?: string[] | null;
          poison?: number | null;
          required_arcane?: number | null;
          required_dexterity?: number | null;
          required_faith?: number | null;
          required_intelligence?: number | null;
          required_strength?: number | null;
          scarlet_rot?: number | null;
          sleep?: number | null;
          type?: TDatabase['public']['Enums']['game_item_type'];
          upgrade_material?: string | null;
          weight?: number | null;
        };
        Update: {
          attack_fire?: number | null;
          attack_holy?: number | null;
          attack_lightning?: number | null;
          attack_magic?: number | null;
          attack_physical?: number | null;
          bleed?: number | null;
          can_change_affinity?: boolean | null;
          critical?: number | null;
          default_skill_id?: number | null;
          frostbite?: number | null;
          game_item_id?: number;
          guard_boost?: number | null;
          guard_fire?: number | null;
          guard_holy?: number | null;
          guard_lightning?: number | null;
          guard_magic?: number | null;
          guard_physical?: number | null;
          madness?: number | null;
          physical_attack_types?: string[] | null;
          poison?: number | null;
          required_arcane?: number | null;
          required_dexterity?: number | null;
          required_faith?: number | null;
          required_intelligence?: number | null;
          required_strength?: number | null;
          scarlet_rot?: number | null;
          sleep?: number | null;
          type?: TDatabase['public']['Enums']['game_item_type'];
          upgrade_material?: string | null;
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'weapon_details_default_skill_id_fkey';
            columns: ['default_skill_id'];
            isOneToOne: false;
            referencedRelation: 'weapon_skills';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'weapon_details_game_item_id_type_fkey';
            columns: ['game_item_id', 'type'];
            isOneToOne: false;
            referencedRelation: 'game_items';
            referencedColumns: ['id', 'type'];
          },
        ];
      };
      weapon_scalings: {
        Row: {
          affinity: string;
          arcane: string | null;
          dexterity: string | null;
          faith: string | null;
          game_item_id: number;
          intelligence: string | null;
          strength: string | null;
        };
        ComputedFields: never;
        Insert: {
          affinity: string;
          arcane?: string | null;
          dexterity?: string | null;
          faith?: string | null;
          game_item_id: number;
          intelligence?: string | null;
          strength?: string | null;
        };
        Update: {
          affinity?: string;
          arcane?: string | null;
          dexterity?: string | null;
          faith?: string | null;
          game_item_id?: number;
          intelligence?: string | null;
          strength?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'weapon_scalings_game_item_id_fkey';
            columns: ['game_item_id'];
            isOneToOne: false;
            referencedRelation: 'weapon_details';
            referencedColumns: ['game_item_id'];
          },
        ];
      };
      weapon_skills: {
        Row: {
          description: string | null;
          fp_cost_text: string | null;
          id: number;
          name: string;
        };
        ComputedFields: never;
        Insert: {
          description?: string | null;
          fp_cost_text?: string | null;
          id?: never;
          name: string;
        };
        Update: {
          description?: string | null;
          fp_cost_text?: string | null;
          id?: never;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      game_item_type:
        | 'spirit_ash'
        | 'ash_of_war'
        | 'weapon'
        | 'armor'
        | 'talisman'
        | 'spell'
        | 'other'
        | 'crystal_tear'
        | 'catalyst'
        | 'other_weapon';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type TDatabaseWithoutInternals = Omit<TDatabase, '__InternalSupabase'>;

type TDefaultSchema = TDatabaseWithoutInternals[Extract<keyof TDatabase, 'public'>];

export type TTables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (TDefaultSchema['Tables'] & TDefaultSchema['Views'])
    | { schema: keyof TDatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof TDatabaseWithoutInternals;
  }
    ? keyof (TDatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        TDatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof TDatabaseWithoutInternals }
  ? (TDatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      TDatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (TDefaultSchema['Tables'] &
        TDefaultSchema['Views'])
    ? (TDefaultSchema['Tables'] &
        TDefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TTablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof TDefaultSchema['Tables'] | { schema: keyof TDatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof TDatabaseWithoutInternals;
  }
    ? keyof TDatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof TDatabaseWithoutInternals }
  ? TDatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof TDefaultSchema['Tables']
    ? TDefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TTablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof TDefaultSchema['Tables'] | { schema: keyof TDatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof TDatabaseWithoutInternals;
  }
    ? keyof TDatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof TDatabaseWithoutInternals }
  ? TDatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof TDefaultSchema['Tables']
    ? TDefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type TEnums<
  DefaultSchemaEnumNameOrOptions extends
    keyof TDefaultSchema['Enums'] | { schema: keyof TDatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof TDatabaseWithoutInternals;
  }
    ? keyof TDatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof TDatabaseWithoutInternals }
  ? TDatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof TDefaultSchema['Enums']
    ? TDefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type TCompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof TDefaultSchema['CompositeTypes'] | { schema: keyof TDatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof TDatabaseWithoutInternals;
  }
    ? keyof TDatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof TDatabaseWithoutInternals }
  ? TDatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof TDefaultSchema['CompositeTypes']
    ? TDefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const DATABASE_CONSTANTS = {
  public: {
    Enums: {
      game_item_type: [
        'spirit_ash',
        'ash_of_war',
        'weapon',
        'armor',
        'talisman',
        'spell',
        'other',
        'crystal_tear',
        'catalyst',
        'other_weapon',
      ],
    },
  },
} as const;
