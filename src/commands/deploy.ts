import { Command, flags } from '@oclif/command';
import { DeployController } from '../controller/deployment/deploy.controller';
import { parseInput } from '../shared/utils';

export class Deploy extends Command {
  public static description =
    'Deploys a function or multiple functions on the LivePerson Functions platform';

  public static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({
      char: 'y',
      description:
        'Agrees to the approval of the deployment and prevents the confirmation dialog',
    }),
    'no-watch': flags.boolean({
      char: 'w',
      description: "Don't watch deployment process",
    }),
  };

  public static strict = false;

  public static args = [{ name: '...functions' }];

  public static examples = [
    '> <%= config.bin %> deploy exampleFunction',
    '> <%= config.bin %> deploy exampleFunction --yes --no-watch',
    '> <%= config.bin %> deploy exampleFunction1 exampleFunction2 -y -w',
  ];

  private deployController: DeployController = new DeployController();

  /**
   * Runs the deploy command and parses the passed functions and flags
   * @returns {Promise<void>} - deploy command
   * @memberof Deploy
   */
  public async run(): Promise<void> {
    const { flags: inputFlags } = this.parse(Deploy);
    const lambdaFunctions = parseInput(Deploy.flags, this.argv);
    this.deployController.deploy({ lambdaFunctions, inputFlags });
  }
}
