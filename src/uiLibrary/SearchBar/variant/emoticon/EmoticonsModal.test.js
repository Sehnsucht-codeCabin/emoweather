import { mount } from "enzyme";
import { EmoweatherProvider } from "../../../../context/Provider";
import { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Frame from "../../../../frame/index";
import Routes from "../../../../Routes";
import Modal from "../../../Modal";
import emoticons from "../../../../assets/emoticons";
import EmoticonsModal from ".";

describe("EmoticonSearchBar", () => {
    let wrapper;
    let emoticonsModal;
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

    test("assess emoticons content", () => {
        const contentContainer = wrapper.find("[data-test='content-container']");
        expect(contentContainer).toHaveLength(1);

        const emoticonButton = contentContainer.find("[data-test='emoticon-button']");
        emoticonButton.simulate("click");

        wrapper.update();

        const modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);
        expect(modal.find("[data-test='modal-background']")).toHaveLength(1);
        expect(modal.find(EmoticonsModal)).toHaveLength(1);

        emoticonsModal = modal.find(EmoticonsModal);
        submitButton = emoticonsModal.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeTruthy();

        const emoticonsButtons = modal.find("[data-test*='emoticon-button']");
        expect(emoticonsButtons.length).toEqual(Object.keys(emoticons).length);
    });

    test("add emoticons", () => {
        let modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);

        emoticonsModal = modal.find(EmoticonsModal);
        expect(emoticonsModal).toHaveLength(1);
        submitButton = emoticonsModal.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeTruthy();

        let sadEmoticonButton = modal.find("[data-test='emoticon-button-sad-non-selected']");
        expect(sadEmoticonButton).toHaveLength(1);
        sadEmoticonButton.simulate("click");

        wrapper.update();

        modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);
        emoticonsModal = modal.find(EmoticonsModal);
        expect(emoticonsModal).toHaveLength(1);
        sadEmoticonButton = modal.find("[data-test='emoticon-button-sad-selected']");
        expect(sadEmoticonButton).toHaveLength(1);
        submitButton = emoticonsModal.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeFalsy();
        let emoticonsButtons = modal.find("[data-test*='emoticon-button']");
        expect(emoticonsButtons.length).toEqual(Object.keys(emoticons).length);

        let coolEmoticonButton = modal.find("[data-test='emoticon-button-cool-non-selected']");
        expect(coolEmoticonButton).toHaveLength(1);
        coolEmoticonButton.simulate("click");

        wrapper.update();

        modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);
        emoticonsModal = modal.find(EmoticonsModal);
        expect(emoticonsModal).toHaveLength(1);
        coolEmoticonButton = modal.find("[data-test='emoticon-button-cool-selected']");
        expect(coolEmoticonButton).toHaveLength(1);
        submitButton = emoticonsModal.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeFalsy();
        emoticonsButtons = modal.find("[data-test*='emoticon-button']");
        expect(emoticonsButtons.length).toEqual(Object.keys(emoticons).length);
    });

    test("remove emoticons", () => {
        let modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);

        emoticonsModal = modal.find(EmoticonsModal);
        expect(emoticonsModal).toHaveLength(1);
        submitButton = emoticonsModal.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeFalsy();

        let sadEmoticonButton = modal.find("[data-test='emoticon-button-sad-selected']");
        expect(sadEmoticonButton).toHaveLength(1);
        sadEmoticonButton.simulate("click");

        wrapper.update();

        modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);
        emoticonsModal = modal.find(EmoticonsModal);
        expect(emoticonsModal).toHaveLength(1);
        sadEmoticonButton = modal.find("[data-test='emoticon-button-sad-non-selected']");
        expect(sadEmoticonButton).toHaveLength(1);
        submitButton = emoticonsModal.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeFalsy();
        let emoticonsButtons = modal.find("[data-test*='emoticon-button']");
        expect(emoticonsButtons.length).toEqual(Object.keys(emoticons).length);

        let coolEmoticonButton = modal.find("[data-test='emoticon-button-cool-selected']");
        expect(coolEmoticonButton).toHaveLength(1);
        coolEmoticonButton.simulate("click");

        wrapper.update();

        modal = wrapper.find(Modal);
        expect(modal).toHaveLength(1);
        emoticonsModal = modal.find(EmoticonsModal);
        expect(emoticonsModal).toHaveLength(1);
        coolEmoticonButton = modal.find("[data-test='emoticon-button-cool-non-selected']");
        expect(coolEmoticonButton).toHaveLength(1);
        submitButton = emoticonsModal.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeTruthy();
        emoticonsButtons = modal.find("[data-test*='emoticon-button']");
        expect(emoticonsButtons.length).toEqual(Object.keys(emoticons).length);
    })
});