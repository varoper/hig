/**
Copyright 2016 Autodesk,Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as PropTypes from 'prop-types';
import HIGElement from '../../../HIGElement';
import HIGNodeList from '../../../HIGNodeList';
import HIGChildValidator from '../../../HIGChildValidator';
import createComponent from '../../../../adapters/createComponent';
import AccountComponent, { Account } from './Account';
import ProjectComponent, { Project } from './Project';

export class ProjectAccountSwitcher extends HIGElement {
  constructor(HIGConstructor, initialProps) {
    super(HIGConstructor, initialProps);

    this.accounts = new HIGNodeList({
      type: Account,
      HIGConstructor: this.hig.partials.Account,
      onAdd: (instance, beforeInstance) => {
        this.hig.addAccount(instance, beforeInstance);
      }
    });

    this.projects = new HIGNodeList({
      type: Project,
      HIGConstructor: this.hig.partials.Project,
      onAdd: (instance, beforeInstance) => {
        this.hig.addProject(instance, beforeInstance);
      }
    });

    [
      '_render',
      'openFlyout',
      'closeFlyout',
      'setActiveAccount',
      'setActiveProject'
    ].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });

    this.state = {};
  }

  componentDidMount() {
    this.accounts.componentDidMount();
    this.projects.componentDidMount();

    this.commitUpdate(this.props);
  }

   commitUpdate(updatePayload, oldProps, newProp) {
     for (let i = 0; i < updatePayload.length; i += 2) {
      const propKey = updatePayload[i];
      const propValue = updatePayload[i + 1];

      switch(propKey) {
        case 'open': {
          if (propValue) {
            this.hig.open();
          } else {
            this.hig.close();
          }
          break;
        }
        case 'activeLabel': {
          this.hig.setActiveLabel(propValue);
          break;
        }
        case 'activeType': {
          this.hig.setActiveType(propValue);
          break;
        }
        case 'onClickOutside': {
          const dispose = this._disposeFunctions.get('onClickOutsideDispose');

          if (dispose) {
            dispose();
          }

          this._disposeFunctions.set(
            'onClickOutisdeDispose',
            this.hig.onClickOutside(propValue)
          );
          break;
        }
        case 'onClick': {
          const dispose = this._disposeFunctions.get('onClick');

          if (dispose) {
            dispose();
          }

          this._disposeFunctions.set(
            'onClick',
            this.hig.onClick(propValue)
          );
          break;
        }
        default: {
          console.warn(`${propKey} is unknown`);
        }
      }
    }  
  }

  // commitUpdate(updatePayload, oldProps, newProp) {
  //   this.processUpdateProps(updatePayload)
  //     .mapToHIGEventListeners(['onClick', 'onClickOutside'])
  //     .handle('open', value => {
  //       this.props.open = value;
  //     })
  //     .handle('onAccountChange', value => {
  //       this.props.onAccountChange = value;
  //     })
  //     .handle('onProjectChange', value => {
  //       this.props.onProjectChange = value;
  //     })
  //     .then(this._render);
  // }

  createElement(ElementConstructor, props) {
    switch (ElementConstructor) {
      case Project:
        return this.projects.createElement(ElementConstructor, props);
      case Account:
        return this.accounts.createElement(ElementConstructor, props);
      default:
        throw new Error(`Unknown type ${ElementConstructor.name}`);
    }
  }

  insertBefore(instance, beforeChild = {}) {
    if (instance instanceof Account) {
      this.accounts.insertBefore(instance);
      instance.onActivate(this.setActiveAccount);
      if (this.state.activeAccount === undefined) {
        this.state.activeAccount = instance;
      }
    } else if (instance instanceof Project) {
      this.projects.insertBefore(instance);
      instance.onActivate(this.setActiveProject);
      if (this.state.activeProject === undefined) {
        this.state.activeProject = instance;
      }
    } else {
      throw new Error(
        `${this.constructor.name} cannot have a child of type ${instance.constructor.name}`
      );
    }
  }

  openFlyout() {
    this.state.open = true;
    this._render();
  }

  closeFlyout() {
    this.state.open = false;
    this._render();
  }

  setActiveAccount(account) {
    this.state.activeAccount = account;
    this.state.open = false;
    this._render();
    if (this.props.onAccountChange) {
      this.props.onAccountChange(account);
    }
  }

  setActiveProject(project) {
    this.state.activeProject = project;
    this.state.open = false;
    this._render();
    if (this.props.onProjectChange) {
      this.props.onProjectChange(project);
    }
  }

  _render() {
    let open = this.props.open;
    if (open === undefined) {
      open = this.state.open;
    }
    open ? this.hig.open() : this.hig.close();

    if (this.projects.length > 1 || this.accounts.length > 1) {
      this.hig.showCaret();
      this.configureHIGEventListener('onClick', this.openFlyout);
      this.configureHIGEventListener('onClickOutside', this.closeFlyout);
    } else {
      this.hig.hideCaret();
      this.configureHIGEventListener('onClick', undefined);
      this.configureHIGEventListener('onClickOutside', undefined);
    }

    this.accounts.forEach(account => {
      account === this.state.activeAccount
        ? account.hig.activate()
        : account.hig.deactivate();
    });
    this.projects.forEach(project => {
      project === this.state.activeProject
        ? project.hig.activate()
        : project.hig.deactivate();
    });

    if (this.state.activeAccount && this.state.activeProject) {
      this.hig.setActiveLabel(
        `${this.state.activeAccount.props.label} / ${this.state.activeProject.props.label}`
      );
      this.hig.setActiveImage(this.state.activeProject.props.image);
      this.hig.setActiveType('project');
    } else if (this.state.activeAccount) {
      this.hig.setActiveLabel(this.state.activeAccount.props.label);
      this.hig.setActiveImage(this.state.activeAccount.props.image);
      this.hig.setActiveType('account');
    } else if (this.state.activeProject) {
      this.hig.setActiveLabel(this.state.activeProject.props.label);
      this.hig.setActiveImage(this.state.activeProject.props.image);
      this.hig.setActiveType('project');
    }
  }
}

const ProjectAccountSwitcherComponent = createComponent(ProjectAccountSwitcher);

ProjectAccountSwitcherComponent.propTypes = {
  open: PropTypes.bool,
  onAccountChange: PropTypes.func,
  onProjectChange: PropTypes.func,
  children: HIGChildValidator([AccountComponent, ProjectComponent])
};

ProjectAccountSwitcherComponent.__docgenInfo = {
  props: {
    open: {
      description: '{bool} opens the project/account switcher'
    },
    onAccountChange: {
      description: 'calls the provided callback when an account is activated in the switcher'
    },
    onProjectChange: {
      description: 'calls the provided callback when a project is activated in the switcher'
    },
    children: {
      description: 'support adding Project and Account'
    }
  }
};

ProjectAccountSwitcherComponent.Account = AccountComponent;
ProjectAccountSwitcherComponent.Project = ProjectComponent;

export default ProjectAccountSwitcherComponent;
