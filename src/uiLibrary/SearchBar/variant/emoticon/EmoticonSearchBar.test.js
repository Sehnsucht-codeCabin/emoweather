import { mount } from "enzyme";
import { EmoweatherProvider } from "../../../../context/Provider";
import { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Frame from "../../../../frame/index";
import Routes from "../../../../Routes";
import Modal from "../../../Modal";
import EmoticonModal from "../../../Modal/children/EmoticonModal";

describe("EmoticonSearchBar", () => {
    let wrapper;
    let searchForm;
    let submitButton;

    beforeAll(() => {
        wrapper = mount(
            <BrowserRouter initialEntries={["/"]}>
                <EmoweatherProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Frame>
                            <Switch>
                                <Routes />
                            </Switch>
                        </Frame>
                    </Suspense>
                </EmoweatherProvider>
            </BrowserRouter>
        );
    });

    test("assess emoticon form", () => {
        const contentContainer = wrapper.find("[data-test='content-container']");
        expect(contentContainer).toHaveLength(1);

        const emoticonButton = contentContainer.find("[data-test='emoticon-button']");
        emoticonButton.simulate("click");

        const modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);
        expect(modal.find("[data-test='modal-background']")).toHaveLength(1);
        expect(modal.find(EmoticonModal)).toHaveLength(1);

        searchForm = modal.find("[data-test='search-form']");
        expect(searchForm).toHaveLength(1);
        submitButton = searchForm.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeTruthy();

        const emoticons = wrapper.find("[data-test='mood-button']");
        expect(emoticons.length).toBeGreaterThan(0);
    });
});