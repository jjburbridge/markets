import {exec} from 'child_process'
import {promisify} from 'util'
import {createClient} from '@sanity/client'

const execAsync = promisify(exec)

interface MigrationResult {
  id: string
  success: boolean
  error?: string
}

/**
 * Strip ANSI escape codes from a string
 * Removes color codes like \x1B[37m, \x1B[0m, etc.
 */
function stripAnsiCodes(str: string): string {
  // Remove ANSI escape sequences: \x1B[...m or \u001B[...m
  return str.replace(/\x1B\[[0-9;]*m/g, '').trim()
}

/**
 * Parse migration list output to extract migration IDs
 * Handles table format:
 * ┌────────┬────────┐
 * │ ID     │ Title  │
 * ├────────┼────────┤
 * │ expand │ expand │
 * │ import │ import │
 * └────────┴────────┘
 */
function parseMigrationIds(output: string): string[] {
  const lines = output.split('\n')
  const ids: string[] = []

  for (const line of lines) {
    // Skip separator rows (┌, ├, └, etc.)
    if (/^[┌├└─┬┼┴┐┤┘ ]*$/.test(line)) {
      continue
    }

    // Skip lines that don't contain │
    if (!line.includes('│')) {
      continue
    }

    // Skip header row (contains "ID" and "Title")
    if (/ID.*Title/.test(line)) {
      continue
    }

    // Extract ID from table row format: │ id │ title │
    const parts = line.split('│')
    if (parts.length >= 3) {
      // Strip ANSI codes and trim whitespace
      const id = stripAnsiCodes(parts[1] || '')
      const title = stripAnsiCodes(parts[2] || '')

      // Skip if ID is empty, "ID", or "Title"
      // Skip if title column is "Title" (header row)
      if (id && id !== 'ID' && id !== 'Title' && title !== 'Title') {
        ids.push(id)
      }
    }
  }

  return [...new Set(ids)] // Remove duplicates
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_SANITY_DATASET as string,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2026-01-10', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
  token: process.env.SANITY_AUTH_TOKEN, // Needed for certain operations like updating content, accessing drafts or using draft perspectives
})

/**
 * Run all available migrations
 */
async function runAllMigrations(): Promise<void> {
  console.log('Fetching migration list...')

  try {
    // Get list of migrations
    const {stdout: migrationListOutput, stderr: listError} = await execAsync(
      'npx sanity migration list',
    )

    if (listError && !migrationListOutput) {
      console.error('Error listing migrations:', listError)
      process.exit(1)
    }

    // Parse migration IDs from output
    const migrationIds = parseMigrationIds(migrationListOutput)

    if (migrationIds.length === 0) {
      console.log('No migrations found')
      return
    }

    console.log(`Found ${migrationIds.length} migration(s): ${migrationIds.join(', ')}`)

    // Fetch already completed migrations to avoid re-running them
    console.log('Checking for already completed migrations...')
    const completedMigrations = await client.fetch(`
      *[_type == "migrations"][0].migrations[status == "completed"].id
    `)

    console.log({completedMigrations})

    const pendingMigrations = migrationIds.filter((id) => !completedMigrations?.includes(id))

    if (pendingMigrations.length === 0) {
      console.log('All migrations have already been completed')
      return
    }

    console.log(
      `Found ${pendingMigrations.length} pending migration(s): ${pendingMigrations.join(', ')}`,
    )

    console.log('Running migrations...')
    const results: MigrationResult[] = []
    const successfulMigrations: string[] = []
    const failedMigrations: string[] = []

    // Run each migration
    for (const id of pendingMigrations) {
      if (!id) {
        continue
      }

      console.log(`\nRunning migration: ${id}`)

      try {
        const startTime = new Date()
        const {stderr, stdout} = await execAsync(`npx sanity migration run ${id} --no-dry-run --no-confirm`)
        const endTime = new Date()
        if (stderr && !stderr.includes('Migration completed')) {
          // Some migrations output to stderr but still succeed
          // Check if it's actually an error
          if (stderr.toLowerCase().includes('error')) {
            throw new Error(stderr)
          }
        }

        console.log({stdout})

        results.push({id, success: true})
        successfulMigrations.push(id)

        const result = await client
          .patch('migrations')
          .setIfMissing({migrations: []})
          .append('migrations', [
            {
              _type: 'migration',
              id,
              status: 'completed',
              timestamp: new Date().toISOString(),
              duration: endTime.getTime() - startTime.getTime(),
            },
          ])
          .commit({autoGenerateArrayKeys: true})
        console.log({result})
        console.log(
          `✓ Migration '${id}' completed successfully in ${endTime.getTime() - startTime.getTime()}ms`,
        )
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        results.push({id, success: false, error: errorMessage})
        failedMigrations.push(id)
        await client
          .patch('migrations')
          .setIfMissing({migrations: []})
          .append('migrations', [
            {
              _type: 'migration',
              id,
              status: 'failed',
              error: errorMessage,
              timestamp: new Date().toISOString(),
            },
          ])
          .commit({autoGenerateArrayKeys: true})
        console.error(`✗ Migration '${id}' failed:`, errorMessage)
      }
    }

    // Report results
    console.log('\n' + '='.repeat(50))
    console.log('Migration Results:')
    console.log('='.repeat(50))
    console.log(`Successful migrations: ${successfulMigrations.length}`)
    if (successfulMigrations.length > 0) {
      console.log(`  ${successfulMigrations.join(', ')}`)
    }
    console.log(`Failed migrations: ${failedMigrations.length}`)
    if (failedMigrations.length > 0) {
      console.log(`  ${failedMigrations.join(', ')}`)
    }

    // Exit with error code if any migrations failed
    if (failedMigrations.length > 0) {
      console.error('\nSome migrations failed!')
      process.exit(1)
    }

    console.log('\nAll migrations completed successfully!')
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

// Export for sanity exec
export default async function runMigrations() {
  await runAllMigrations()
}

// Also run when executed directly (for sanity exec)
runAllMigrations().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
