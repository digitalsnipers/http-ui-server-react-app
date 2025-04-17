import React, { useState } from "react";
import {
  Button,
  TrashIcon,
  InfoSignIcon,
  Dialog,
  toaster,
  RefreshIcon,
  ArrowDownIcon,
} from "evergreen-ui";
import axios from "../../services/connection";

function Actions(props) {
  const { operation, status, id, progress, onSelect, refresh } = props;
  const [confirm, setConfirm] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const cancel_job = async () => {
    setConfirmLoading(true);
    try {
      const res = await axios.delete(`jobs/${id}`);
      if (res.data.status) {
        toaster.success("Job deleted succesfully");
        if (refresh) {
          refresh();
        }
      } else {
        toaster.warning("Error deleting job");
      }
    } catch (error) {
      toaster.warning("Something went wrong! please try again later.");
      console.log("error", error);
    }
    setConfirmLoading(false);
    setConfirm(null);
  };

  const retry_job = async () => {
    setConfirmLoading(true);
    try {
      const res = await axios.post(`jobs/retry/${id}`);
      if (res.data.status) {
        toaster.success("Job updated succesfully");
        if (refresh) {
          refresh();
        }
      } else {
        toaster.warning("Error updating job");
      }
    } catch (error) {
      toaster.warning("Something went wrong! please try again later.");
      console.log("error", error);
    }
    setConfirmLoading(false);
    setConfirm(null);
  };

  const handle_confirm = () => {
    switch (confirm) {
      case "Submit retry request?":
        retry_job();
        break;

      case "Sure to cancel?":
        cancel_job();
        break;

      default:
        break;
    }
  };

  const handle_download = () => {
    window.open(
      `${
        process.env.NODE_ENV === "production" ? "/" : "//localhost:4000"
      }/downloads//${id}.${operation === "extract" ? "zip" : "txt"}`
    );
  };

  return (
    <div style={{ display: "flex", justifyContent:'flex-start' }}>
      <Button
        marginRight={16}
        appearance="minimal"
        intent="primary"
        iconBefore={InfoSignIcon}
        onClick={onSelect}
      >
        Info
      </Button>
      {status === "queue" && (
        <Button
          marginRight={16}
          appearance="minimal"
          intent="danger"
          iconBefore={TrashIcon}
          onClick={() => setConfirm("Sure to cancel?")}
        >
          Cancel
        </Button>
      )}
      {status === "error" && (
        <Button
          marginRight={16}
          appearance="minimal"
          iconBefore={RefreshIcon}
          onClick={() => setConfirm("Submit retry request?")}
        >
          Retry
        </Button>
      )}
      {status === "complete" &&
        (operation === "extract" || operation === "get") && (
          <Button
            marginRight={16}
            appearance="minimal"
            iconBefore={ArrowDownIcon}
            onClick={handle_download}
          >
            Download
          </Button>
        )}
      <Dialog
        isShown={Boolean(confirm)}
        hasHeader={false}
        title="Dialog title"
        onCloseComplete={() => setConfirm(null)}
        confirmLabel="Continue"
        onConfirm={handle_confirm}
        isConfirmLoading={confirmLoading}
        shouldCloseOnOverlayClick={false}
        hasClose={!confirmLoading}
        width={300}
        contentContainerProps={{
          style: { padding: "32px 32px 0px 32px", marginBottom: -20 },
        }}
      >
        {confirm}
      </Dialog>
    </div>
  );
}

export default Actions;
