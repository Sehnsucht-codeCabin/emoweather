import { mount } from "enzyme";
import Footer from ".";

describe("Footer", () => {
    test("assess Footer", () => {
        const wrapper = mount(<Footer />);
        expect(wrapper.find("[data-test='copyright-data']")).toHaveLength(1);
    });
});