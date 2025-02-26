"use client"
import { ConfigProvider, Form, Input, Select } from "antd";

const ChnagePassword = () => {
    const { Option } = Select;
    const onFinish = (values) => {
        console.log(values)
    }
    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Form: {
                            borderRadius: 0,
                        },
                        Input: {
                            borderRadius: 5,
                        },
                    },
                }}
            >
                <Form
                    name="contact"
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    layout="vertical"
                >

                    <Form.Item
                        name="email"
                        label={<p className=" text-md">Email</p>}
                        style={{}}
                    >
                        <Input
                            required
                            style={{ padding: "6px" }}
                            className=" text-md"
                            placeholder="Your Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="old-password"
                        label={<p className=" text-md">Old Password</p>}
                    >
                        <Input
                            required
                            style={{ padding: "6px" }}
                            className=" text-md"
                            type="old-password "
                            placeholder="Old Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="new-password"
                        label={<p className=" text-md">New Password</p>}
                    >
                        <Input
                            required
                            style={{ padding: "6px" }}
                            className=" text-md"
                            type="new-password "
                            placeholder="New Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm-password"
                        label={<p className=" text-md">Confirm Password</p>}
                    >
                        <Input
                            required
                            style={{ padding: "6px" }}
                            className=" text-md"
                            type="confirm-password "
                            placeholder="Confirm Password"
                        />
                    </Form.Item>



                    <Form.Item className="text-end">
                        <button
                            className="px-5 py-2 bg-primary text-white rounded-xl font-bold "
                            htmlType="submit"
                        >
                            Update
                        </button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default ChnagePassword;