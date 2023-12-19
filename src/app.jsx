/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import cockpit from 'cockpit';
import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { Form, FormGroup, FormSection, TextInput, Button } from '@patternfly/react-core';
/// import { LocalConfiguration } from './components/localConfiguration';

const _ = cockpit.gettext;

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hostname: _("Unknown"),
            nameVariable: "",
            valueVariable: "",
        };

        this.handleNewVariable = () => {
            console.log(this.state.nameVariable);
            console.log(this.state.valueVariable);
            const cmd = ["sudo", "-S", "<<<", "gallardo", "docker", "run", "--env-file=/tmp/test.txt", "custom-python-app"];
            cockpit.script("echo " + this.state.nameVariable.toUpperCase() + "=" + this.state.valueVariable + " >> /tmp/test.txt");
            cockpit.spawn(cmd, { superuser: "try", err: "message" }).done(function(data) { console.log(data); console.log("DATA MESSAGE") })
                    .fail(function (error) { console.log(error); console.log("ERROR MESSAGE") });

            /// cockpit.script("sudo docker run --env-file=/tmp/test.txt custom-python-app");
        };

        this.handleInputChange = (event, value) => {
            const { name } = event.target;

            this.setState({
                [name]: value
            });
        };
    }

    render() {
        const {
            nameVariable,
            valueVariable
        } = this.state;

        return (
            <Form>
                <FormSection>
                    <FormGroup label="Set new variable name" isRequired fieldId="name-input">
                        <TextInput isRequired name='nameVariable' id='nameVariable' type="text" defaultValue={nameVariable.toUpperCase()} value={nameVariable.toUpperCase()} onChange={this.handleInputChange} />
                    </FormGroup>
                </FormSection>
                <FormSection>
                    <FormGroup label="Set value for new variable" isRequired fieldId="value-input">
                        <TextInput isRequired name='valueVariable' id='valueVariable' type="text" defaultValue={valueVariable} onChange={this.handleInputChange} />
                    </FormGroup>
                </FormSection>
                <Button id='submit' name='submit' onClick={this.handleNewVariable}>Set variable</Button>
            </Form>
        );
    }
}