'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">meeting_room_booking_system_backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-e86f0bb92490ec0e93b539b522f2e19dfeca6855e8036e82a31c45fd51837a9576939840940354f9f7fcb03502bd1e93e7b1b68253f67d3641535e14d56ee0aa"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e86f0bb92490ec0e93b539b522f2e19dfeca6855e8036e82a31c45fd51837a9576939840940354f9f7fcb03502bd1e93e7b1b68253f67d3641535e14d56ee0aa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e86f0bb92490ec0e93b539b522f2e19dfeca6855e8036e82a31c45fd51837a9576939840940354f9f7fcb03502bd1e93e7b1b68253f67d3641535e14d56ee0aa"' :
                                            'id="xs-controllers-links-module-AppModule-e86f0bb92490ec0e93b539b522f2e19dfeca6855e8036e82a31c45fd51837a9576939840940354f9f7fcb03502bd1e93e7b1b68253f67d3641535e14d56ee0aa"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e86f0bb92490ec0e93b539b522f2e19dfeca6855e8036e82a31c45fd51837a9576939840940354f9f7fcb03502bd1e93e7b1b68253f67d3641535e14d56ee0aa"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e86f0bb92490ec0e93b539b522f2e19dfeca6855e8036e82a31c45fd51837a9576939840940354f9f7fcb03502bd1e93e7b1b68253f67d3641535e14d56ee0aa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e86f0bb92490ec0e93b539b522f2e19dfeca6855e8036e82a31c45fd51837a9576939840940354f9f7fcb03502bd1e93e7b1b68253f67d3641535e14d56ee0aa"' :
                                        'id="xs-injectables-links-module-AppModule-e86f0bb92490ec0e93b539b522f2e19dfeca6855e8036e82a31c45fd51837a9576939840940354f9f7fcb03502bd1e93e7b1b68253f67d3641535e14d56ee0aa"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookingModule.html" data-type="entity-link" >BookingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BookingModule-001497fe94bd851b4be798c837135e274afd3c825c53d71091b262c4dd592d72913ecd6c86fe902a487ba7562e1ae439e9f957425896aa688bf03f6fdfefb4f3"' : 'data-bs-target="#xs-controllers-links-module-BookingModule-001497fe94bd851b4be798c837135e274afd3c825c53d71091b262c4dd592d72913ecd6c86fe902a487ba7562e1ae439e9f957425896aa688bf03f6fdfefb4f3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BookingModule-001497fe94bd851b4be798c837135e274afd3c825c53d71091b262c4dd592d72913ecd6c86fe902a487ba7562e1ae439e9f957425896aa688bf03f6fdfefb4f3"' :
                                            'id="xs-controllers-links-module-BookingModule-001497fe94bd851b4be798c837135e274afd3c825c53d71091b262c4dd592d72913ecd6c86fe902a487ba7562e1ae439e9f957425896aa688bf03f6fdfefb4f3"' }>
                                            <li class="link">
                                                <a href="controllers/BookingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BookingModule-001497fe94bd851b4be798c837135e274afd3c825c53d71091b262c4dd592d72913ecd6c86fe902a487ba7562e1ae439e9f957425896aa688bf03f6fdfefb4f3"' : 'data-bs-target="#xs-injectables-links-module-BookingModule-001497fe94bd851b4be798c837135e274afd3c825c53d71091b262c4dd592d72913ecd6c86fe902a487ba7562e1ae439e9f957425896aa688bf03f6fdfefb4f3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BookingModule-001497fe94bd851b4be798c837135e274afd3c825c53d71091b262c4dd592d72913ecd6c86fe902a487ba7562e1ae439e9f957425896aa688bf03f6fdfefb4f3"' :
                                        'id="xs-injectables-links-module-BookingModule-001497fe94bd851b4be798c837135e274afd3c825c53d71091b262c4dd592d72913ecd6c86fe902a487ba7562e1ae439e9f957425896aa688bf03f6fdfefb4f3"' }>
                                        <li class="link">
                                            <a href="injectables/BookingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmailModule-8db6b253cb9e768316a2ab6f6941dd038f97021c21be8d6ac09f5351d7ccf91f6fc5d6b42d4ba5ae891b28027fcfe4589ed3b273e4c82bc53685a2f351c733b7"' : 'data-bs-target="#xs-controllers-links-module-EmailModule-8db6b253cb9e768316a2ab6f6941dd038f97021c21be8d6ac09f5351d7ccf91f6fc5d6b42d4ba5ae891b28027fcfe4589ed3b273e4c82bc53685a2f351c733b7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailModule-8db6b253cb9e768316a2ab6f6941dd038f97021c21be8d6ac09f5351d7ccf91f6fc5d6b42d4ba5ae891b28027fcfe4589ed3b273e4c82bc53685a2f351c733b7"' :
                                            'id="xs-controllers-links-module-EmailModule-8db6b253cb9e768316a2ab6f6941dd038f97021c21be8d6ac09f5351d7ccf91f6fc5d6b42d4ba5ae891b28027fcfe4589ed3b273e4c82bc53685a2f351c733b7"' }>
                                            <li class="link">
                                                <a href="controllers/EmailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmailModule-8db6b253cb9e768316a2ab6f6941dd038f97021c21be8d6ac09f5351d7ccf91f6fc5d6b42d4ba5ae891b28027fcfe4589ed3b273e4c82bc53685a2f351c733b7"' : 'data-bs-target="#xs-injectables-links-module-EmailModule-8db6b253cb9e768316a2ab6f6941dd038f97021c21be8d6ac09f5351d7ccf91f6fc5d6b42d4ba5ae891b28027fcfe4589ed3b273e4c82bc53685a2f351c733b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-8db6b253cb9e768316a2ab6f6941dd038f97021c21be8d6ac09f5351d7ccf91f6fc5d6b42d4ba5ae891b28027fcfe4589ed3b273e4c82bc53685a2f351c733b7"' :
                                        'id="xs-injectables-links-module-EmailModule-8db6b253cb9e768316a2ab6f6941dd038f97021c21be8d6ac09f5351d7ccf91f6fc5d6b42d4ba5ae891b28027fcfe4589ed3b273e4c82bc53685a2f351c733b7"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MeetingRoomModule.html" data-type="entity-link" >MeetingRoomModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MeetingRoomModule-3903a6fd062a820f4429e45803481372f14f0c10cb69115c5e6d5dcd39bbd762411104c412f12ac50fa4bad32513bf8cf36d1c1e76d368ff25ae347e54ab44ce"' : 'data-bs-target="#xs-controllers-links-module-MeetingRoomModule-3903a6fd062a820f4429e45803481372f14f0c10cb69115c5e6d5dcd39bbd762411104c412f12ac50fa4bad32513bf8cf36d1c1e76d368ff25ae347e54ab44ce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MeetingRoomModule-3903a6fd062a820f4429e45803481372f14f0c10cb69115c5e6d5dcd39bbd762411104c412f12ac50fa4bad32513bf8cf36d1c1e76d368ff25ae347e54ab44ce"' :
                                            'id="xs-controllers-links-module-MeetingRoomModule-3903a6fd062a820f4429e45803481372f14f0c10cb69115c5e6d5dcd39bbd762411104c412f12ac50fa4bad32513bf8cf36d1c1e76d368ff25ae347e54ab44ce"' }>
                                            <li class="link">
                                                <a href="controllers/MeetingRoomController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeetingRoomController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MeetingRoomModule-3903a6fd062a820f4429e45803481372f14f0c10cb69115c5e6d5dcd39bbd762411104c412f12ac50fa4bad32513bf8cf36d1c1e76d368ff25ae347e54ab44ce"' : 'data-bs-target="#xs-injectables-links-module-MeetingRoomModule-3903a6fd062a820f4429e45803481372f14f0c10cb69115c5e6d5dcd39bbd762411104c412f12ac50fa4bad32513bf8cf36d1c1e76d368ff25ae347e54ab44ce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MeetingRoomModule-3903a6fd062a820f4429e45803481372f14f0c10cb69115c5e6d5dcd39bbd762411104c412f12ac50fa4bad32513bf8cf36d1c1e76d368ff25ae347e54ab44ce"' :
                                        'id="xs-injectables-links-module-MeetingRoomModule-3903a6fd062a820f4429e45803481372f14f0c10cb69115c5e6d5dcd39bbd762411104c412f12ac50fa4bad32513bf8cf36d1c1e76d368ff25ae347e54ab44ce"' }>
                                        <li class="link">
                                            <a href="injectables/MeetingRoomService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeetingRoomService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-aeeb6d9a468e4d3ecd280b5e4796c6eead419ebcbe0ddadc038f4999047378d8ce79ca7d3a211c74062b1b0dcca804c310afdd06eaae88bf3510b6a11d4ede51"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-aeeb6d9a468e4d3ecd280b5e4796c6eead419ebcbe0ddadc038f4999047378d8ce79ca7d3a211c74062b1b0dcca804c310afdd06eaae88bf3510b6a11d4ede51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-aeeb6d9a468e4d3ecd280b5e4796c6eead419ebcbe0ddadc038f4999047378d8ce79ca7d3a211c74062b1b0dcca804c310afdd06eaae88bf3510b6a11d4ede51"' :
                                        'id="xs-injectables-links-module-RedisModule-aeeb6d9a468e4d3ecd280b5e4796c6eead419ebcbe0ddadc038f4999047378d8ce79ca7d3a211c74062b1b0dcca804c310afdd06eaae88bf3510b6a11d4ede51"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticModule.html" data-type="entity-link" >StatisticModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StatisticModule-936e57e8369f9c67f36d70a9aa00ece2f20918972972f9ee672bf735753f4a52263c74aaf76abd1d8b110e07bb4060be1b9e2235c920e5f367919c3841a8adaa"' : 'data-bs-target="#xs-controllers-links-module-StatisticModule-936e57e8369f9c67f36d70a9aa00ece2f20918972972f9ee672bf735753f4a52263c74aaf76abd1d8b110e07bb4060be1b9e2235c920e5f367919c3841a8adaa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StatisticModule-936e57e8369f9c67f36d70a9aa00ece2f20918972972f9ee672bf735753f4a52263c74aaf76abd1d8b110e07bb4060be1b9e2235c920e5f367919c3841a8adaa"' :
                                            'id="xs-controllers-links-module-StatisticModule-936e57e8369f9c67f36d70a9aa00ece2f20918972972f9ee672bf735753f4a52263c74aaf76abd1d8b110e07bb4060be1b9e2235c920e5f367919c3841a8adaa"' }>
                                            <li class="link">
                                                <a href="controllers/StatisticController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StatisticModule-936e57e8369f9c67f36d70a9aa00ece2f20918972972f9ee672bf735753f4a52263c74aaf76abd1d8b110e07bb4060be1b9e2235c920e5f367919c3841a8adaa"' : 'data-bs-target="#xs-injectables-links-module-StatisticModule-936e57e8369f9c67f36d70a9aa00ece2f20918972972f9ee672bf735753f4a52263c74aaf76abd1d8b110e07bb4060be1b9e2235c920e5f367919c3841a8adaa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StatisticModule-936e57e8369f9c67f36d70a9aa00ece2f20918972972f9ee672bf735753f4a52263c74aaf76abd1d8b110e07bb4060be1b9e2235c920e5f367919c3841a8adaa"' :
                                        'id="xs-injectables-links-module-StatisticModule-936e57e8369f9c67f36d70a9aa00ece2f20918972972f9ee672bf735753f4a52263c74aaf76abd1d8b110e07bb4060be1b9e2235c920e5f367919c3841a8adaa"' }>
                                        <li class="link">
                                            <a href="injectables/StatisticService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-027fa87098aeb7e9d786aa264bc51c1c3261488c7bbff3eabc6ac47a0af5402cd1989e2ccc315bf130df7b31576b74e86adafb139c188c67d597687fe15bf58f"' : 'data-bs-target="#xs-controllers-links-module-UserModule-027fa87098aeb7e9d786aa264bc51c1c3261488c7bbff3eabc6ac47a0af5402cd1989e2ccc315bf130df7b31576b74e86adafb139c188c67d597687fe15bf58f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-027fa87098aeb7e9d786aa264bc51c1c3261488c7bbff3eabc6ac47a0af5402cd1989e2ccc315bf130df7b31576b74e86adafb139c188c67d597687fe15bf58f"' :
                                            'id="xs-controllers-links-module-UserModule-027fa87098aeb7e9d786aa264bc51c1c3261488c7bbff3eabc6ac47a0af5402cd1989e2ccc315bf130df7b31576b74e86adafb139c188c67d597687fe15bf58f"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-027fa87098aeb7e9d786aa264bc51c1c3261488c7bbff3eabc6ac47a0af5402cd1989e2ccc315bf130df7b31576b74e86adafb139c188c67d597687fe15bf58f"' : 'data-bs-target="#xs-injectables-links-module-UserModule-027fa87098aeb7e9d786aa264bc51c1c3261488c7bbff3eabc6ac47a0af5402cd1989e2ccc315bf130df7b31576b74e86adafb139c188c67d597687fe15bf58f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-027fa87098aeb7e9d786aa264bc51c1c3261488c7bbff3eabc6ac47a0af5402cd1989e2ccc315bf130df7b31576b74e86adafb139c188c67d597687fe15bf58f"' :
                                        'id="xs-injectables-links-module-UserModule-027fa87098aeb7e9d786aa264bc51c1c3261488c7bbff3eabc6ac47a0af5402cd1989e2ccc315bf130df7b31576b74e86adafb139c188c67d597687fe15bf58f"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BookingController.html" data-type="entity-link" >BookingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailController.html" data-type="entity-link" >EmailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MeetingRoomController.html" data-type="entity-link" >MeetingRoomController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StatisticController.html" data-type="entity-link" >StatisticController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Booking.html" data-type="entity-link" >Booking</a>
                                </li>
                                <li class="link">
                                    <a href="entities/MeetingRoom.html" data-type="entity-link" >MeetingRoom</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Permission.html" data-type="entity-link" >Permission</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BookingListVo.html" data-type="entity-link" >BookingListVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookingVo.html" data-type="entity-link" >BookingVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMeetingRoomDto.html" data-type="entity-link" >CreateMeetingRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomExceptionFilter.html" data-type="entity-link" >CustomExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserVo.html" data-type="entity-link" >LoginUserVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeetingRoomListVo.html" data-type="entity-link" >MeetingRoomListVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeetingRoomUsedCountVo.html" data-type="entity-link" >MeetingRoomUsedCountVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeetingRoomVo.html" data-type="entity-link" >MeetingRoomVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/refreshTokenVo.html" data-type="entity-link" >refreshTokenVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnLoginException.html" data-type="entity-link" >UnLoginException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnloginFilter.html" data-type="entity-link" >UnloginFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMeetingRoomDto.html" data-type="entity-link" >UpdateMeetingRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPasswordDto.html" data-type="entity-link" >UpdateUserPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserBookingCountVo.html" data-type="entity-link" >UserBookingCountVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDetailVo.html" data-type="entity-link" >UserDetailVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfo.html" data-type="entity-link" >UserInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserListVo.html" data-type="entity-link" >UserListVo</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookingService.html" data-type="entity-link" >BookingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormatResponseInterceptor.html" data-type="entity-link" >FormatResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvokeRecordInterceptor.html" data-type="entity-link" >InvokeRecordInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeetingRoomService.html" data-type="entity-link" >MeetingRoomService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedisService.html" data-type="entity-link" >RedisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatisticService.html" data-type="entity-link" >StatisticService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PermissionGuard.html" data-type="entity-link" >PermissionGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/JwtUserData.html" data-type="entity-link" >JwtUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});