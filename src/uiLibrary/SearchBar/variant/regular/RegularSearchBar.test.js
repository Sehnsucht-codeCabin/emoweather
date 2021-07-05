import { mount } from "enzyme";
import { EmoweatherProvider } from "../../../../context/Provider";
import { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Frame from "../../../../frame/index";
import Routes from "../../../../Routes";

describe("RegularSearchBar", () => {
    let wrapper;
    let searchForm;
    let inputField;
    let submitButton;
    let hintContent;

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

    test("assess search form and check field input", () => {
        searchForm = wrapper.find("[data-test='search-form']");
        expect(searchForm).toHaveLength(1);
        submitButton = searchForm.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeTruthy();
        inputField = searchForm.find("input");
        expect(inputField).toHaveLength(1);
        hintContent = wrapper.find("[data-test='hint-content']");
        expect(hintContent.text()).toBe("");

        inputField.getDOMNode().value = "ok"; // hackish way to cover for currentTarget
        inputField.simulate("change");

        searchForm = wrapper.find("[data-test='search-form']");
        inputField = searchForm.find("input");
        expect(inputField.props().value).toBe("ok");
        submitButton = searchForm.find("[type='submit']");
        expect(submitButton.props().disabled).toBeFalsy();

        hintContent = wrapper.find("[data-test='hint-content']");
        expect(hintContent.text()).not.toBe("");
    });

    test("add key words", () => {
        inputField.getDOMNode().value = "ok,"; // hackish way to cover for currentTarget
        inputField.simulate("change");
        searchForm = wrapper.find("[data-test='search-form']");
        submitButton = searchForm.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeFalsy();
        inputField = searchForm.find("input");
        let keywords = searchForm.find("[data-test='keyword-enabled']");
        expect(keywords).toHaveLength(1);
        expect(inputField.props().value).toBe("");
        hintContent = wrapper.find("[data-test='hint-content']");
        expect(hintContent.text()).toBe("");

        inputField.getDOMNode().value = "sad,"; // hackish way to cover for currentTarget
        inputField.simulate("change");
        searchForm = wrapper.find("[data-test='search-form']");
        submitButton = searchForm.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeFalsy();
        inputField = searchForm.find("input");
        keywords = searchForm.find("[data-test='keyword-enabled']");
        expect(keywords).toHaveLength(2);
        expect(inputField.props().value).toBe("");
        hintContent = wrapper.find("[data-test='hint-content']");
        expect(hintContent.text()).toBe("");

        inputField.getDOMNode().value = "happy,"; // hackish way to cover for currentTarget
        inputField.simulate("change");
        searchForm = wrapper.find("[data-test='search-form']");
        submitButton = searchForm.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeFalsy();
        inputField = searchForm.find("input");
        keywords = searchForm.find("[data-test='keyword-enabled']");
        expect(keywords).toHaveLength(3);
        expect(inputField.props().value).toBe("");
        hintContent = wrapper.find("[data-test='hint-content']");
        expect(hintContent.text()).toBe("");

        inputField.getDOMNode().value = "happy,"; // hackish way to cover for currentTarget
        inputField.simulate("change");
        searchForm = wrapper.find("[data-test='search-form']");
        submitButton = searchForm.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeFalsy();
        inputField = searchForm.find("input");
        keywords = searchForm.find("[data-test='keyword-enabled']");
        expect(keywords).toHaveLength(3);
        expect(inputField.props().value).toBe("");
        hintContent = wrapper.find("[data-test='hint-content']");
        expect(hintContent.text()).not.toBe("");

        expect(keywords.at(0).find("[data-test='term']").text()).toBe("ok");
        expect(keywords.at(1).find("[data-test='term']").text()).toBe("sad");
        expect(keywords.at(2).find("[data-test='term']").text()).toBe("happy");
    });

    test("disable key words", () => {
        searchForm = wrapper.find("[data-test='search-form']");
        let enabledKeyWords = searchForm.find("[data-test='keyword-enabled']");

        enabledKeyWords.at(0).find("[data-test='remove-keyword-button']").simulate("click");
        searchForm = wrapper.find("[data-test='search-form']");
        enabledKeyWords = searchForm.find("[data-test='keyword-enabled']");
        expect(enabledKeyWords).toHaveLength(2);
        let disabledKeyWords = searchForm.find("[data-test='keyword-disabled']");
        expect(disabledKeyWords).toHaveLength(1);
        expect(disabledKeyWords.at(0).find("[data-test='term']").text()).toBe("ok");

        enabledKeyWords.at(0).find("[data-test='remove-keyword-button']").simulate("click");
        searchForm = wrapper.find("[data-test='search-form']");
        enabledKeyWords = searchForm.find("[data-test='keyword-enabled']");
        expect(enabledKeyWords).toHaveLength(1);
        disabledKeyWords = searchForm.find("[data-test='keyword-disabled']");
        expect(disabledKeyWords).toHaveLength(2);
        expect(disabledKeyWords.at(0).find("[data-test='term']").text()).toBe("ok");
        expect(disabledKeyWords.at(1).find("[data-test='term']").text()).toBe("sad");
    });

    test("restore disabled key words", () => {
        searchForm = wrapper.find("[data-test='search-form']");
        let disabledKeyWords = searchForm.find("[data-test='keyword-disabled']");
        expect(disabledKeyWords).toHaveLength(2);
        let enabledKeyWords = searchForm.find("[data-test='keyword-enabled']");
        expect(enabledKeyWords).toHaveLength(1);

        disabledKeyWords.at(0).find("[data-test='remove-keyword-button']").simulate("click");
        searchForm = wrapper.find("[data-test='search-form']");
        enabledKeyWords = searchForm.find("[data-test='keyword-enabled']");
        expect(enabledKeyWords).toHaveLength(2);
        expect(enabledKeyWords.at(0).find("[data-test='term']").text()).toBe("ok");
        expect(enabledKeyWords.at(1).find("[data-test='term']").text()).toBe("happy");
        disabledKeyWords = searchForm.find("[data-test='keyword-disabled']");
        expect(disabledKeyWords).toHaveLength(1);
        expect(disabledKeyWords.at(0).find("[data-test='term']").text()).toBe("sad");
    });
});