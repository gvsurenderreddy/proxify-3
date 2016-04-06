import { BaseTrapHandler } from './BaseTrapHandler';

/**
 * Class representing the traps used to proxy arrays.
 * Extends {@link handlers.BaseTrapHandler}.
 * @memberOf handlers
 */
class ArrayTrapHandler extends BaseTrapHandler {
  constructor(emitter, config) {
    super(emitter, config);
  }
}

export { ArrayTrapHandler };
