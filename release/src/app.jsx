import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {addLocaleData, IntlProvider} from "react-intl";
import localeRu from "react-intl/locale-data/ru";

import TestApplication from "app/TestApplication";

import HomePage from "app/page/HomePage";
import DetailPage from "app/page/DetailPage";

addLocaleData(localeRu);


render((
    <IntlProvider locale="ru">
        <BrowserRouter>
            <TestApplication>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/index.html" component={HomePage}/>

                    <Route exact path="/create.html" component={DetailPage}/>
                    <Route exact path="/detail/:ouid.html" component={DetailPage}/>
                </Switch>
            </TestApplication>
        </BrowserRouter>
    </IntlProvider>
), document.getElementById('pageContent'));