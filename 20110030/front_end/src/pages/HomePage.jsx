import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPostApi,
  deletePostApi,
  editPostApi,
  getAllPostApi,
} from "../api/post";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";

const HomePage = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState({});
  const [postId, setPostId] = useState();
  const { mutate: handleCreatePost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      message.success("Create post success");
      getListPost();
    },
  });
  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      message.success("delete post success");
      getListPost();
    },
  });
  const { mutate: handleEditPostMutate } = useMutation({
    mutationFn: () => editPostApi(postId, content),
    onSuccess: () => {
      message.success("Edit post success");
      getListPost();
    },
  });
  // Get Post
  const { data: listPosts, refetch: getListPost } = useQuery({
    queryKey: ["ListPost"],
    queryFn: () => getAllPostApi(),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    handleCreatePost(values);
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (author, content, id) => {
    form.setFieldsValue({ author: author, content: content });
    setPostId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEditPost = (value) => {
    setContent(value);
    handleEditPostMutate(postId, value);
    setIsModalOpen(false);
  };
  //   const HandleDeletePost = (id) => {};
  useEffect(() => {
    getListPost();
  }, []);
  return (
    <div className="container mx-auto p-4"
    style={{
      maxWidth: 800,
    }}>
      <h1 className="text-3xl font-bold mb-4">Basic Blog</h1>

      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please input author!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Please input content!",
            },
          ]}
        >
           <TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="default" htmlType="submit">
            Add a new post
          </Button>
        </Form.Item>
      </Form>
      {listPosts &&
        listPosts.posts.map((post) => {
          return (
            <div
              key={post.id}
              className="post bg-white border border-gray-300 rounded p-4 shadow mb-4"
            >
              <div className="author bg-gray-200 p-1 font-bold">
                <p>{post.author}</p>
              </div>

              <div className="content bg-gray-100 p-2">
                <p>{post.content}</p>
              </div>
              <div className="button-container flex justify-between items-center">
                <button
                  className="view-button bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => navigate(`/detail/${post.id}`)}
                >
                  View detail
                </button>

                <button
                  onClick={() => showModal(post.author, post.content, post.id)}
                  className="edit-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit Post
                </button>

                <button
                  className="delete-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete Post
                </button>
              </div>
            </div>
          );
        })}
      <Modal
        title="Edit Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleEditPost}
          autoComplete="off"
        >
          <Form.Item
            label="Author"
            name="author"
            rules={[
              {
                required: true,
                message: "Please input author!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: "Please input content!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="default" htmlType="submit">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
