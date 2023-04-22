import React, { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FTextField, FUploadImage, FormProvider } from "../../components/form";
import { Box, Card, Stack } from "@mui/material";
import { alpha } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "./postSlice";
import useAuth from "../../hooks/useAuth";

const loginSchema = yup.object().shape({
  content: yup.string().required("Post is required"),
});

function EditPost({ post, CloseModal, handleClose }) {
  const defaultValues = {
    content: post?.content || "",
    image: post?.image || "",
  };

  const postId = post._id;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });
  const { user } = useAuth();

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptFiles) => {
      const file = acceptFiles[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    dispatch(editPost({ ...data, id: postId, user })).then(() => reset());
    CloseModal();
    handleClose();
  };
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            placeholder="Share what your are thinking here..."
            multiline
            rows={4}
            fullWidth
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <LoadingButton
              type="submit"
              size="small"
              variant="contained"
              loading={isSubmitting || isLoading}
            >
              Update
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default EditPost;
