import * as actions from "containers/Home/store/actions";
import React, { FunctionComponent } from "react";
import { AppState } from "application";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import NavBar from "containers/UI/NavBar/NavBar";
import Projects from "containers/Home/UI/Projects/Projects";
import Footer from "containers/UI/Footer/Footer";
import IntroHeader from "containers/UI/IntroHeader/IntroHeader";
import IntroSkill from "containers/Home/UI/Intro/Intro";
import Contact from "containers/Home/UI/Contact/Contact";
import Levels from "containers/Home/UI/Levels/Levels";
import { HomeActions } from "containers/Home/store/types";
import { LinkedProjectProps } from "containers/Home/UI/Project/Project";
import { Parallax } from "react-parallax";
import { Typography } from "@material-ui/core";
import SplitText from "react-pose-text";
import ProjectPopup from "containers/Home/UI/ProjectPopup/ProjectPopup";
import { Element } from "react-scroll";
import { Spacing } from "components/Spacing/Spacing";
import "Common.scss";
import "./Home.scss";
import {useTranslation} from "react-i18next";

const charPoses = {
	exit: { opacity: 0, y: 20 },
	enter: {
		opacity: 1,
		y: 0,
		delay: ({ charIndex }: any) => charIndex * 30
	}
};

/**
 * Home page container.
 */
const Home: FunctionComponent = (): JSX.Element =>
{
	const { t } = useTranslation();
	const isDarkMode = useSelector((state: AppState) => state.app.isDarkMode);

	return (
		<>
			{/* Header */}
			<Element name="header-section" />
			<NavBar className="navbar" />

			{/* About */}
			<IntroHeader title="Iswenzz" desc="HOME_HEADER"
				bgImage={require(`assets/images/index/${isDarkMode ? "20.jpg" : "nature1.jpg"}`)} />
			<IntroSkill />
			<Parallax style={{backgroundColor: isDarkMode ? "black" : "rgb(122,206,255)"}}
				bgImageAlt="index" strength={400}
				bgImage={require(`assets/images/index/${isDarkMode ? "stars" : "clouds"}.svg`)}>
				<Spacing height='100px' />
			</Parallax>

			{/* Projects */}
			<ProjectPopup />
			<Projects />
			<Parallax style={{backgroundColor: isDarkMode ? "black" : "rgb(122, 206, 255)"}} 
				bgImageAlt="index" strength={400}
				bgImage={require(`assets/images/index/${isDarkMode ? "stars" : "clouds"}.svg`)}>
				<Spacing height='100px' />
			</Parallax>

			{/* Levels */}
			<Levels />

			{/* Contact */}
			<Parallax className="contact-parallax" bgImageAlt="index" strength={200} blur={1}
				bgImage={require(`assets/images/index/${isDarkMode ? "55.jpg" : "t1.jpg"}`)}>
				<Typography className="poiret-h1 bold noselect contact-typo" align="center" variant="h2" component="h2">
					<SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
						{t("CONTACT_HEADER")}
					</SplitText>
				</Typography>
			</Parallax>
			<Contact />

			{/* Footer */}
			<Footer />
		</>
	);
};

interface LinkStateProps 
{
	projects: LinkedProjectProps[],
	projectsStartIndex: number,
	projectModalActive: boolean
}

interface LinkDispatchProps 
{
	setProjectsIndex: (index: number) => void,
	toggleProjectModalActive: (active: boolean) => void
}

export type ReduxHomeProps = LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => ({
	projects: state.home.projects,
	projectsStartIndex: state.home.projectsStartIndex,
	projectModalActive: state.home.projectModalActive
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, HomeActions>, ownProps: any): LinkDispatchProps => ({
	setProjectsIndex: bindActionCreators(actions.setProjectsIndex, dispatch),
	toggleProjectModalActive: bindActionCreators(actions.toggleProjectModalActive, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);