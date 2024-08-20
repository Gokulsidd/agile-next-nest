import type { NextApiRequest, NextApiResponse } from 'next'

export type ConfigurationType = {
  NODE_ENV?: string
  API_BASE_URL?: string
  GOOGLE_CLIENT_ID?: string
  TOOL_BASE_URL?: string
  MARBLISM_MICHELANGELO_ACTIVE?: boolean
  MAPBOX_ACCESS_TOKEN?: string
  REQUIREMENTS_LIST_COUNT?: string
  MAX_REQUIREMENTS?: string
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const values: ConfigurationType = {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    TOOL_BASE_URL: process.env.TOOL_BASE_URL,
    MARBLISM_MICHELANGELO_ACTIVE:
      process.env.MARBLISM_MICHELANGELO_ACTIVE === 'true',
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    REQUIREMENTS_LIST_COUNT: process.env.REQUIREMENTS_LIST_COUNT,
    MAX_REQUIREMENTS: process.env.MAX_REQUIREMENTS,
  }

  response.status(200).json(values)
}
