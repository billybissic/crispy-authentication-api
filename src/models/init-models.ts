import type { Sequelize } from "sequelize";
import { access_levels as _access_levels } from "./access_levels";
import type { access_levelsAttributes, access_levelsCreationAttributes } from "./access_levels";
import { group_access_levels as _group_access_levels } from "./group_access_levels";
import type { group_access_levelsAttributes, group_access_levelsCreationAttributes } from "./group_access_levels";
import { group_password_resets as _group_password_resets } from "./group_password_resets";
import type { group_password_resetsAttributes, group_password_resetsCreationAttributes } from "./group_password_resets";
import { group_settings as _group_settings } from "./group_settings";
import type { group_settingsAttributes, group_settingsCreationAttributes } from "./group_settings";
import { group_tokens as _group_tokens } from "./group_tokens";
import type { group_tokensAttributes, group_tokensCreationAttributes } from "./group_tokens";
import { groups as _groups } from "./groups";
import type { groupsAttributes, groupsCreationAttributes } from "./groups";
import { user_access_levels as _user_access_levels } from "./user_access_levels";
import type { user_access_levelsAttributes, user_access_levelsCreationAttributes } from "./user_access_levels";
import { user_activities as _user_activities } from "./user_activities";
import type { user_activitiesAttributes, user_activitiesCreationAttributes } from "./user_activities";
import { user_devices as _user_devices } from "./user_devices";
import type { user_devicesAttributes, user_devicesCreationAttributes } from "./user_devices";
import { user_environmental_data as _user_environmental_data } from "./user_environmental_data";
import type { user_environmental_dataAttributes, user_environmental_dataCreationAttributes } from "./user_environmental_data";
import { user_group_access_levels as _user_group_access_levels } from "./user_group_access_levels";
import type { user_group_access_levelsAttributes, user_group_access_levelsCreationAttributes } from "./user_group_access_levels";
import { user_groups as _user_groups } from "./user_groups";
import type { user_groupsAttributes, user_groupsCreationAttributes } from "./user_groups";
import { user_logs as _user_logs } from "./user_logs";
import type { user_logsAttributes, user_logsCreationAttributes } from "./user_logs";
import { user_messages as _user_messages } from "./user_messages";
import type { user_messagesAttributes, user_messagesCreationAttributes } from "./user_messages";
import { user_notifications as _user_notifications } from "./user_notifications";
import type { user_notificationsAttributes, user_notificationsCreationAttributes } from "./user_notifications";
import { user_password_resets as _user_password_resets } from "./user_password_resets";
import type { user_password_resetsAttributes, user_password_resetsCreationAttributes } from "./user_password_resets";
import { user_profiles as _user_profiles } from "./user_profiles";
import type { user_profilesAttributes, user_profilesCreationAttributes } from "./user_profiles";
import { user_settings as _user_settings } from "./user_settings";
import type { user_settingsAttributes, user_settingsCreationAttributes } from "./user_settings";
import { user_social_media_profiles as _user_social_media_profiles } from "./user_social_media_profiles";
import type { user_social_media_profilesAttributes, user_social_media_profilesCreationAttributes } from "./user_social_media_profiles";
import { user_sessions as _user_sessions } from "./user_sessions";
import type { user_sessionsAttributes, user_sessionsCreationAttributes } from "./user_sessions";
import { user_vitals as _user_vitals } from "./user_vitals";
import type { user_vitalsAttributes, user_vitalsCreationAttributes } from "./user_vitals";
import { users as _users } from "../old-models/users";
import type { usersAttributes, usersCreationAttributes } from "../old-models/users";
import { administrators as _administrators } from "../models/administrators";
import type { administratorsAttributes, admninistratorsCreationAttributes } from "./administrators";

export {
  _access_levels as access_levels,
  _group_access_levels as group_access_levels,
  _group_password_resets as group_password_resets,
  _group_settings as group_settings,
  _group_tokens as group_tokens,
  _groups as groups,
  _user_access_levels as user_access_levels,
  _user_activities as user_activities,
  _user_devices as user_devices,
  _user_environmental_data as user_environmental_data,
  _user_group_access_levels as user_group_access_levels,
  _user_groups as user_groups,
  _user_logs as user_logs,
  _user_messages as user_messages,
  _user_notifications as user_notifications,
  _user_password_resets as user_password_resets,
  _user_profiles as user_profiles,
  _user_settings as user_settings,
  _user_social_media_profiles as user_social_media_profiles,
  _user_sessions as user_sessions,
  _user_vitals as user_vitals,
  _users as users,
  _administrators as administrators
};

export type {
  access_levelsAttributes,
  access_levelsCreationAttributes,
  group_access_levelsAttributes,
  group_access_levelsCreationAttributes,
  group_password_resetsAttributes,
  group_password_resetsCreationAttributes,
  group_settingsAttributes,
  group_settingsCreationAttributes,
  group_tokensAttributes,
  group_tokensCreationAttributes,
  groupsAttributes,
  groupsCreationAttributes,
  user_access_levelsAttributes,
  user_access_levelsCreationAttributes,
  user_activitiesAttributes,
  user_activitiesCreationAttributes,
  user_devicesAttributes,
  user_devicesCreationAttributes,
  user_environmental_dataAttributes,
  user_environmental_dataCreationAttributes,
  user_group_access_levelsAttributes,
  user_group_access_levelsCreationAttributes,
  user_groupsAttributes,
  user_groupsCreationAttributes,
  user_logsAttributes,
  user_logsCreationAttributes,
  user_messagesAttributes,
  user_messagesCreationAttributes,
  user_notificationsAttributes,
  user_notificationsCreationAttributes,
  user_password_resetsAttributes,
  user_password_resetsCreationAttributes,
  user_profilesAttributes,
  user_profilesCreationAttributes,
  user_settingsAttributes,
  user_settingsCreationAttributes,
  user_social_media_profilesAttributes,
  user_social_media_profilesCreationAttributes,
  user_sessionsAttributes,
  user_sessionsCreationAttributes,
  user_vitalsAttributes,
  user_vitalsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
  administratorsAttributes,
  admninistratorsCreationAttributes
};

export function initModels(sequelize: Sequelize) {
  const access_levels = _access_levels.initModel(sequelize);
  const group_access_levels = _group_access_levels.initModel(sequelize);
  const group_password_resets = _group_password_resets.initModel(sequelize);
  const group_settings = _group_settings.initModel(sequelize);
  const group_tokens = _group_tokens.initModel(sequelize);
  const groups = _groups.initModel(sequelize);
  const user_access_levels = _user_access_levels.initModel(sequelize);
  const user_activities = _user_activities.initModel(sequelize);
  const user_devices = _user_devices.initModel(sequelize);
  const user_environmental_data = _user_environmental_data.initModel(sequelize);
  const user_group_access_levels = _user_group_access_levels.initModel(sequelize);
  const user_groups = _user_groups.initModel(sequelize);
  const user_logs = _user_logs.initModel(sequelize);
  const user_messages = _user_messages.initModel(sequelize);
  const user_notifications = _user_notifications.initModel(sequelize);
  const user_password_resets = _user_password_resets.initModel(sequelize);
  const user_profiles = _user_profiles.initModel(sequelize);
  const user_settings = _user_settings.initModel(sequelize);
  const user_social_media_profiles = _user_social_media_profiles.initModel(sequelize);
  const user_sessions = _user_sessions.initModel(sequelize);
  const user_vitals = _user_vitals.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const administrators = _administrators.initModel(sequelize);

  access_levels.belongsToMany(groups, { as: 'group_id_groups', through: group_access_levels, foreignKey: "level_id", otherKey: "group_id" });
  access_levels.belongsToMany(users, { as: 'user_id_users', through: user_access_levels, foreignKey: "level_id", otherKey: "user_id" });
  groups.belongsToMany(access_levels, { as: 'level_id_access_levels', through: group_access_levels, foreignKey: "group_id", otherKey: "level_id" });
  groups.belongsToMany(users, { as: 'user_id_users_user_groups', through: user_groups, foreignKey: "group_id", otherKey: "user_id" });
  users.belongsToMany(access_levels, { as: 'level_id_access_levels_user_access_levels', through: user_access_levels, foreignKey: "user_id", otherKey: "level_id" });
  users.belongsToMany(groups, { as: 'group_id_groups_user_groups', through: user_groups, foreignKey: "user_id", otherKey: "group_id" });
  group_access_levels.belongsTo(access_levels, { as: "level", foreignKey: "level_id"});
  access_levels.hasMany(group_access_levels, { as: "group_access_levels", foreignKey: "level_id"});
  user_access_levels.belongsTo(access_levels, { as: "level", foreignKey: "level_id"});
  access_levels.hasMany(user_access_levels, { as: "user_access_levels", foreignKey: "level_id"});
  user_group_access_levels.belongsTo(access_levels, { as: "level", foreignKey: "level_id"});
  access_levels.hasMany(user_group_access_levels, { as: "user_group_access_levels", foreignKey: "level_id"});
  group_access_levels.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(group_access_levels, { as: "group_access_levels", foreignKey: "group_id"});
  group_password_resets.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(group_password_resets, { as: "group_password_resets", foreignKey: "group_id"});
  group_settings.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(group_settings, { as: "group_settings", foreignKey: "group_id"});
  group_tokens.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(group_tokens, { as: "group_tokens", foreignKey: "group_id"});
  user_group_access_levels.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(user_group_access_levels, { as: "user_group_access_levels", foreignKey: "group_id"});
  user_groups.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(user_groups, { as: "user_groups", foreignKey: "group_id"});
  groups.belongsTo(users, { as: "owner", foreignKey: "owner_id"});
  users.hasMany(groups, { as: "groups", foreignKey: "owner_id"});
  user_access_levels.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_access_levels, { as: "user_access_levels", foreignKey: "user_id"});
  user_activities.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_activities, { as: "user_activities", foreignKey: "user_id"});
  user_devices.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_devices, { as: "user_devices", foreignKey: "user_id"});
  user_environmental_data.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_environmental_data, { as: "user_environmental_data", foreignKey: "user_id"});
  user_group_access_levels.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_group_access_levels, { as: "user_group_access_levels", foreignKey: "user_id"});
  user_groups.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_groups, { as: "user_groups", foreignKey: "user_id"});
  user_logs.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_logs, { as: "user_logs", foreignKey: "user_id"});
  user_messages.belongsTo(users, { as: "receiver", foreignKey: "receiver_id"});
  users.hasMany(user_messages, { as: "user_messages", foreignKey: "receiver_id"});
  user_messages.belongsTo(users, { as: "sender", foreignKey: "sender_id"});
  users.hasMany(user_messages, { as: "sender_user_messages", foreignKey: "sender_id"});
  user_notifications.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_notifications, { as: "user_notifications", foreignKey: "user_id"});
  user_password_resets.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_password_resets, { as: "user_password_resets", foreignKey: "user_id"});
  user_profiles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_profiles, { as: "user_profiles", foreignKey: "user_id"});
  user_settings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(user_settings, { as: "user_setting", foreignKey: "user_id"});
  user_social_media_profiles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_social_media_profiles, { as: "user_social_media_profiles", foreignKey: "user_id"});
  user_sessions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_sessions, { as: "user_sessions", foreignKey: "user_id"});
  user_vitals.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_vitals, { as: "user_vitals", foreignKey: "user_id"});
  //administrators.belongsTo(users, { as: "user", foreignKey: "user_id"});

  return {
    access_levels: access_levels,
    group_access_levels: group_access_levels,
    group_password_resets: group_password_resets,
    group_settings: group_settings,
    group_tokens: group_tokens,
    groups: groups,
    user_access_levels: user_access_levels,
    user_activities: user_activities,
    user_devices: user_devices,
    user_environmental_data: user_environmental_data,
    user_group_access_levels: user_group_access_levels,
    user_groups: user_groups,
    user_logs: user_logs,
    user_messages: user_messages,
    user_notifications: user_notifications,
    user_password_resets: user_password_resets,
    user_profiles: user_profiles,
    user_settings: user_settings,
    user_social_media_profiles: user_social_media_profiles,
    user_sessions: user_sessions,
    user_vitals: user_vitals,
    users: users,
    administrators: administrators,
  };
}
