import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"
import type { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function dedupe<CachedFunction extends Function>(
  fn: CachedFunction,
): CachedFunction {
  return fn
}

const dedupeMap = new Map<string, Promise<unknown>>()

export function createDedupeFn<
  T extends Zod.ZodSchema,
  Fn extends (input: Zod.infer<T>) => Promise<unknown>,
  R = ReturnType<Fn>,
>(schema: T, fn: Fn): (input: Zod.infer<T>) => R {
  const dedupeUuid = crypto.randomUUID()

  return function (input: Zod.infer<T>): R {
    try {
      schema.parse(input)
    } catch (e) {
      throw new Error(
        "Invalid arguments: " +
          (e as ZodError).errors.map((err) => err.message).join(", "),
      )
    }

    const key = dedupeUuid + ":" + JSON.stringify(input)

    // If there's a pending promise for the same key, return it
    if (dedupeMap.has(key)) {
      return dedupeMap.get(key) as R
    }

    // Otherwise, call the callback and cache the result
    const promise = fn(input)
      .then((result) => {
        dedupeMap.delete(key)
        return result
      })
      .catch((error) => {
        dedupeMap.delete(key)
        throw error
      })

    // Store the pending promise
    dedupeMap.set(key, promise)
    return promise as R
  }
}

/**
 * Generate a URL-friendly slug from a speaker name
 * @param name - The speaker's full name
 * @returns A slugified version of the name
 */
export function generateSpeakerSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

/**
 * Find a speaker by their slug
 * @param speakers - Array of speaker objects
 * @param slug - The URL slug to search for
 * @returns The matching speaker or undefined
 */
export function findSpeakerBySlug<T extends { name: string }>(
  speakers: T[],
  slug: string,
): T | undefined {
  return speakers.find((speaker) => generateSpeakerSlug(speaker.name) === slug)
}

/**
 * Find a sponsor by their ID
 * @param sponsors - Array of sponsor objects
 * @param id - The sponsor ID to search for
 * @returns The matching sponsor or undefined
 */
export function findSponsorById<T extends { id: string }>(
  sponsors: T[],
  id: string,
): T | undefined {
  return sponsors.find((sponsor) => sponsor.id === id)
}
