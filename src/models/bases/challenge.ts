import { MaxLength } from 'class-validator'
import { Snowflake } from 'discord.js'
import { Column } from 'typeorm'
import { Mission } from './mission'
import { DateTime } from 'luxon'
import { DateTimeTransformer } from '../transformers/date-time'
import { I18n } from '../../core'

/**
 * The base class for all challenges
 */
export abstract class Challenge extends Mission {
  /**
   * The challenge name as a localisation key.
   */
  challenge_type!: string

  /**
   * The challenge's name, used in challenge lists.
   */
  @Column()
  @MaxLength(150)
  // Cannot contain profanity
  // Cannot mention entities
  // Cannot contain URLs
  name!: string

  /**
   * Whether or not the challenge should show up in challenge lists.
   */
  @Column({ name: 'is_visible' })
  isVisible: boolean = true

  /**
   * When the challenge should start
   */
  @Column({ name: 'start_at', transformer: new DateTimeTransformer(), type: 'varchar' })
  startAt!: DateTime

  /**
   * Whether of not the challenge has started
   */
  @Column({ name: 'has_started' })
  hasStarted: boolean = false

  /**
   * The ID of the user that created the challenge.
   */
  @Column({ name: 'created_by' })
  @MaxLength(30)
  createdBy!: Snowflake

  /**
   * Marks the challenge as started
   */
  async start (): Promise<void> {
    this.hasStarted = true

    await this.save()
  }

  async challenge_name (locale: string): Promise<string> {
    return await I18n.translate(locale, `challenges:challenge_types.${this.challenge_type}`)
  }
}
