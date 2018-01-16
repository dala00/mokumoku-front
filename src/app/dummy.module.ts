import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { RouterLinkStubDirective } from '../testing/router-stubs';

/**
 * Needed so that `aot` build is working. But it isn't used throughout our tests and/or app.
 */
@NgModule({
    imports: [
        AppModule
    ],
    declarations: [
        RouterLinkStubDirective,
    ]
})
export class FakeRouterModule {
}
