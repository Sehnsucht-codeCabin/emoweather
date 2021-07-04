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

    beforeAll(() => {
        // wrapper = mount(
        //     <EmoweatherProvider>
        //         <Suspense fallback={<div>Loading...</div>}>
        //             <Frame>
        //             </Frame>
        //         </Suspense>
        //     </EmoweatherProvider>
        // );
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
        let submitButton = searchForm.find("[type='submit']");
        expect(submitButton).toHaveLength(1);
        expect(submitButton.props().disabled).toBeTruthy();
        inputField = searchForm.find("input");
        expect(inputField).toHaveLength(1);

        inputField.getDOMNode().value = "ok"; // hackish way to cover for currentTarget
        inputField.simulate("change");

        searchForm = wrapper.find("[data-test='search-form']");
        inputField = searchForm.find("input");
        expect(inputField.props().value).toBe("ok");
        submitButton = searchForm.find("[type='submit']");
        expect(submitButton.props().disabled).toBeFalsy();
    });

    test("assess key words", () => {
        inputField.getDOMNode().value = "ok,"; // hackish way to cover for currentTarget
        inputField.simulate("change");
        searchForm = wrapper.find("[data-test='search-form']");
        inputField = searchForm.find("input");
        let keywords = searchForm.find("[data-test='keyword']");
        expect(keywords).toHaveLength(1);
        expect(inputField.props().value).toBe("");

        inputField.getDOMNode().value = "sad,"; // hackish way to cover for currentTarget
        inputField.simulate("change");
        searchForm = wrapper.find("[data-test='search-form']");
        inputField = searchForm.find("input");
        keywords = searchForm.find("[data-test='keyword']");
        expect(keywords).toHaveLength(2);
        expect(inputField.props().value).toBe("");

        inputField.getDOMNode().value = "happy,"; // hackish way to cover for currentTarget
        inputField.simulate("change");
        searchForm = wrapper.find("[data-test='search-form']");
        inputField = searchForm.find("input");
        keywords = searchForm.find("[data-test='keyword']");
        expect(keywords).toHaveLength(3);
        expect(inputField.props().value).toBe("");

        inputField.getDOMNode().value = "happy,"; // hackish way to cover for currentTarget
        inputField.simulate("change");
        searchForm = wrapper.find("[data-test='search-form']");
        inputField = searchForm.find("input");
        keywords = searchForm.find("[data-test='keyword']");
        expect(keywords).toHaveLength(3);
        expect(inputField.props().value).toBe("");
    });
});