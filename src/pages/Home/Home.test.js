import { mount } from "enzyme";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from ".";
import { EmoweatherProvider } from "../../context/Provider";
import Frame from "../../frame";
import { Suspense } from "react";
import Routes from "../../Routes";
import Modal from "../../uiLibrary/Modal";
import RegularSearchBar from "../../uiLibrary/SearchBar/variant/regular";
import EmoticonsModal from "../../uiLibrary/SearchBar/variant/emoticon";

describe("Home", () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(<BrowserRouter initialEntries={["/"]}>
            <EmoweatherProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Frame>
                        <Switch>
                            <Routes />
                        </Switch>
                    </Frame>
                </Suspense>
            </EmoweatherProvider>
        </BrowserRouter>);
    });

    test("assess Home", () => {
        const myHome = wrapper.find(Home);
        expect(myHome).toHaveLength(1);

        const contentContainer = wrapper.find("[data-test='content-container']");
        expect(contentContainer).toHaveLength(1);
        const searchBar = contentContainer.find(RegularSearchBar);
        expect(searchBar).toHaveLength(1);

        const emoticonButton = contentContainer.find("[data-test='emoticon-button']");
        emoticonButton.simulate("click");
    });

    test("click emoticon button and activate emoticons modal", () => {
        const contentContainer = wrapper.find("[data-test='content-container']");
        expect(contentContainer).toHaveLength(1);

        const emoticonButton = contentContainer.find("[data-test='emoticon-button']");
        emoticonButton.simulate("click");

        const modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);
        expect(modal.find("[data-test='modal-background']")).toHaveLength(1);
        expect(modal.find(EmoticonsModal)).toHaveLength(1);
    });
});