import { Argv } from 'yargs'
import { prepareEnvironment } from '../common/setup'
import { BasicArguments, getFilename, OtomiDebugger, setParsedArgs, terminal } from '../common/utils'
import { startServer, stopServer } from '../server/index'

type Arguments = BasicArguments

const cmdName = getFilename(import.meta.url)
const debug: OtomiDebugger = terminal(cmdName)

const server = (): void => {
  debug.info('Starting server')
  try {
    startServer()
  } finally {
    stopServer()
  }
}

export const module = {
  command: cmdName,
  describe: undefined,
  builder: (parser: Argv): Argv => parser,

  handler: async (argv: Arguments): Promise<void> => {
    setParsedArgs(argv)
    await prepareEnvironment({ skipAllPreChecks: true })
    server()
  },
}