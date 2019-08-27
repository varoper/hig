import React from "react";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import KnobbedThemeProvider from "@hig/storybook/storybook-support/decorators/KnobbedThemeProvider";
import { Settings24, Dashboard24, Placeholder24 } from "@hig/icons";
import avatarImagePath from "@hig/storybook/storybook-support/fixtures/avatar/chris-reynolds.png";
import thumbImagePath from "@hig/storybook/storybook-support/fixtures/project/architecture.png";
import infoOptions from "./infoOptions";
import renderStory from "./renderStory";

const storybook = storiesOf("Menu", module);

storybook.add(
  "default",
  withInfo({
    ...infoOptions,
    propTablesExclude: [KnobbedThemeProvider]
  })(() =>
    renderStory({
      checkmark: true,
      className: "a b",
      multiple: true,
      selected: ["basic1", "settings", "project1"],
      items: [
        {
          items: [
            {
              id: "basic1",
              label: "Basic Item 1"
            },
            {
              id: "basic 2",
              label: "Basic Item 2"
            },
            {
              id: "basic 3",
              label: "Basic Item 3",
              disabled: true
            }
          ]
        },
        {
          label: "With Icon",
          variant: "withIcon",
          items: [
            {
              id: "settings",
              label: "Settings",
              icon: <Settings24 />
            },
            {
              id: "dashboard",
              label: "Dashboard",
              icon: <Dashboard24 />,
              items: [
                {
                  id: "basic1",
                  label: "Basic Item 1"
                },
                {
                  id: "basic 2",
                  label: "Basic Item 2"
                },
                {
                  id: "basic 3",
                  label: "Basic Item 3",
                  disabled: true
                }
              ]
            },
            {
              id: "placeholder",
              label: "Disabled Placeholder",
              icon: <Placeholder24 />,
              disabled: true
            }
          ]
        },
        {
          label: "With Avatar",
          variant: "withAvatar",
          items: [
            {
              id: "mariaMcCaplin",
              label: "Maria McCaplin",
              avatar: avatarImagePath
            },
            {
              id: "anonymous",
              label: "Anonymous"
            },
            {
              id: "mariaMcCaplin2",
              label: "Disabled User",
              avatar: avatarImagePath,
              disabled: true
            }
          ]
        },
        {
          label: "With Thumbnail",
          variant: "withThumb",
          items: [
            {
              id: "project1",
              label: "Project 1",
              thumb: thumbImagePath
            },
            {
              id: "project2",
              label: "Project 2",
              thumb: thumbImagePath
            },
            {
              id: "project3",
              label: "Project 3",
              thumb: thumbImagePath,
              disabled: true
            }
          ]
        }
      ]
    })
  )
);
