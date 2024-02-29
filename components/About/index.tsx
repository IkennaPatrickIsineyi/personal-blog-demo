'use client'

import { Box } from "@mui/material";
import React from "react";
import { aboutPageStyle } from "./style";
import UiTextBanner from "../UiTextBanner";
import UiContainer from "../UiContainer";
import UiText from "../UiText";
import { aboutSample } from "../../utils/dataSamples";
import UiSpacer from "../UiSpacer";

export default function About() {
    return <Box sx={aboutPageStyle.container}>
        {/* Banner */}
        <UiTextBanner value="Ikenna" />

        <UiSpacer direction="vertical" size="large" />

        <UiContainer size="large">
            <Box>
                {/* Image */}
                <img src='/images/about.png' style={{ height: '100%', width: '100%', objectFit: 'contain' }} />

                <UiSpacer direction="vertical" size="large" />

                {/* About me heading*/}
                <UiText value={'About Me'} size="extra" color="text.primary" fontWeight={700} />

                <UiSpacer direction="vertical" size="xsmall" />

                {/* About me value */}
                <UiText value={aboutSample.about} size="normal" color="text.secondary" />

                <UiSpacer direction="vertical" size="large" />

                {/* Skills heading*/}
                <UiText value={'Skills'} size="extra" color="text.primary" fontWeight={700} />


                {/* Skills value */}
                <ul style={{ margin: 0 }}>
                    {aboutSample.skills.map((item, index) => {
                        return <li key={index}>
                            <UiText value={item} size="normal" color="text.secondary" />
                        </li>
                    })}
                </ul>

                <UiSpacer direction="vertical" size="large" />

                {/* Experience heading*/}
                <UiText value={'Experience'} size="extra" color="text.primary" fontWeight={700} />

                {/* Experience value */}
                <ul style={{ margin: 0 }}>
                    {aboutSample.experience.map((item, index) => {
                        return <li key={index}>
                            <UiText value={item} size="normal" color="text.secondary" />
                        </li>
                    })}
                </ul>

                <UiSpacer direction="vertical" size="large" />

                {/* Education heading*/}
                <UiText value={'Education'} size="extra" color="text.primary" fontWeight={700} />

                {/* Education value */}
                <ul style={{ margin: 0 }}>
                    {aboutSample.education.map((item, index) => {
                        return <li key={index}>
                            <UiText value={item} size="medium" color="text.secondary" />
                        </li>
                    })}
                </ul>

                <UiSpacer direction="vertical" size="large" />
            </Box>
        </UiContainer>

    </Box>
}