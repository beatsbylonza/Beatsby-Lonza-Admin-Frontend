import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
 
const container: Container = new Container();

/* Dependency Injection */

const { lazyInject } = getDecorators(container);

export { lazyInject };
