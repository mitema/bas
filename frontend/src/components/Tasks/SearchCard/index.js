import LinkedinSearchCard from "./LinkedinSearchCard";
import {IndeedSearchCard} from "./IndeedSearchCard";
import linkedin_logo from "../../../assets/icons8-linkedin-2.svg"
import indeed_logo from "../../../assets/icons8-indeed.svg"
import {createContext, useContext} from "react";
import {SearchCardContext} from "../../../App";
import { Box, Image, Checkbox } from '@chakra-ui/react'

export function SearchCard() {
    const {platform, cardId} = useContext(SearchCardContext)
    const platforms = {
        linkedin: {
            component: LinkedinSearchCard,
            logo: linkedin_logo,
            alt: "Linkedin"
        },
        indeed: {
            component: IndeedSearchCard,
            logo: indeed_logo,
            alt: "Indeed"
        }
    }
    const Component = platforms[platform].component
    return (
        <div style={{display: "flex", margin: "16px 0 0 0", gap: "4px", height: "55px"}}>
            <div>
            <Checkbox
                defaultChecked
                value={cardId}
                // onChange={} // TODO select this card
                size="lg"
                borderColor="#0088CC"

            >
                <Box
                    borderRadius='base' overflow='hidden'  border='1px' borderColor='gray.300'
                    style={{
                        height: 32,
                        width: 32,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Image
                        src={platforms[platform].logo}
                        alt={platforms[platform].alt}
                        style={{height: "22px"}}
                    />

                </Box>
                </Checkbox>
            </div>
            <Component/>
        </div>
    )
}

export const JobBoardContext = createContext({
    initialValues: null,
    radiusOptions: null,
    experienceOptions: null,
    ageOptions: null,
    ExperienceSelect: null
})