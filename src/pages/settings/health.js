import React from "react";
import {
  FolderCloseIcon,
  IconButton,
  GridViewIcon,
  ListIcon,
  UploadIcon,
  CrossIcon,
  toaster,
  TextInput,
  DocumentIcon,
  CompressedIcon,
  TickCircleIcon,
  AutomaticUpdatesIcon,
  ControlIcon,
  AntennaIcon,
  Spinner,
  CycleIcon,
  TrashIcon,
  RefreshIcon,
  AlignLeftIcon,
} from "evergreen-ui";

function Health({ health, health_loading }) {
  const render_status = (type) => {
    if (health_loading) {
      return <RefreshIcon marginRight={16} style={{ opacity: 0.3 }} />;
    }
    switch (type) {
      case "manager":
        return (
          <ControlIcon
            color={health?.manager ? "info" : "danger"}
            size={30}
            marginRight={16}
          />
        );

      case "collector":
        return (
          <AntennaIcon
            color={health?.collector ? "info" : "danger"}
            size={30}
            marginRight={16}
          />
        );

      case "ilm":
        return (
          <AutomaticUpdatesIcon
            color={health?.ilm ? "info" : "danger"}
            size={30}
            marginRight={16}
          />
        );

      case "worker":
        return (
          <CycleIcon
            color={health?.worker ? "info" : "danger"}
            size={30}
            marginRight={16}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div style={{padding:50}}>
      <div style={{ display: "flex", alignItems: "center", marginBottom:30 }}>
        {render_status("manager")}
        <div>
          Flatfile Manager
          <p style={{ margin: 0, opacity: 0.5, fontSize: 10 }}>Online</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom:30 }}>
        {render_status("collector")}
        <div>
          Log Collector
          <p style={{ margin: 0, opacity: 0.5, fontSize: 10 }}>
            {health?.collector ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom:30 }}>
        {render_status("ilm")}
        <div>
          Index Lifecycle Manager
          <p style={{ margin: 0, opacity: 0.5, fontSize: 10 }}>
            {health?.ilm ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom:30 }}>
        {render_status("worker")}
        <div>
          Flatfile worker
          <p style={{ margin: 0, opacity: 0.5, fontSize: 10 }}>
            {health?.worker ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Health;
