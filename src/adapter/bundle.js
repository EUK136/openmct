/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2016, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define([
    'legacyRegistry',
    './actions/ActionDialogDecorator',
    './directives/MCTView',
    './services/Instantiate',
    './capabilities/APICapabilityDecorator',
    './policies/AdapterCompositionPolicy'
], function (
    legacyRegistry,
    ActionDialogDecorator,
    MCTView,
    Instantiate,
    APICapabilityDecorator,
    AdapterCompositionPolicy
) {
    legacyRegistry.register('src/adapter', {
        "extensions": {
            "directives": [
                {
                    key: "mctView",
                    implementation: MCTView,
                    depends: [
                        "newViews[]",
                        "mct"
                    ]
                }
            ],
            services: [
                {
                    key: "instantiate",
                    priority: "mandatory",
                    implementation: Instantiate,
                    depends: [
                        "capabilityService",
                        "identifierService",
                        "cacheService"
                    ]
                }
            ],
            components: [
                {
                    type: "decorator",
                    provides: "capabilityService",
                    implementation: APICapabilityDecorator,
                    depends: [
                        "$injector"
                    ]
                },
                {
                    type: "decorator",
                    provides: "actionService",
                    implementation: ActionDialogDecorator,
                    depends: [ "mct", "newViews[]" ]
                }
            ],
            policies: [
                {
                    category: "composition",
                    implementation: AdapterCompositionPolicy,
                    depends: [ "mct" ]
                }
            ],
            licenses: [
                {
                    "name": "almond",
                    "version": "0.3.3",
                    "description": "Lightweight RequireJS replacement for builds",
                    "author": "jQuery Foundation",
                    "website": "https://github.com/requirejs/almond",
                    "copyright": "Copyright jQuery Foundation and other contributors, https://jquery.org/",
                    "license": "license-mit",
                    "link": "https://github.com/requirejs/almond/blob/master/LICENSE"
                },
                {
                    "name": "lodash",
                    "version": "3.10.1",
                    "description": "Utility functions",
                    "author": "Dojo Foundation",
                    "website": "https://lodash.com",
                    "copyright": "Copyright 2012-2015 The Dojo Foundation",
                    "license": "license-mit",
                    "link": "https://raw.githubusercontent.com/lodash/lodash/3.10.1/LICENSE"
                },
                {
                    "name": "Zepto",
                    "version": "1.1.6",
                    "description": "DOM manipulation library",
                    "author": "Thomas Fuchs",
                    "website": "http://zeptojs.com",
                    "copyright": "Copyright (c) 2010-2016 Thomas Fuchs",
                    "license": "license-mit",
                    "link": "https://github.com/madrobby/zepto/blob/master/MIT-LICENSE"
                }
            ]
        }
    });
});
