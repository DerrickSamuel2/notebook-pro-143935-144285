/**
 * All REST API methods go here.
 * This file is the single interface for network operations for the app.
 * The actual endpoint URLs should match those provided by the backend.
 */
import { apiRequest } from "./client";

// === AUTH & ACCOUNT ===
// PUBLIC_INTERFACE
export function login(data) {
  // data: { email, password }
  return apiRequest("/auth/login", { method: "POST", body: data });
}
// PUBLIC_INTERFACE
export function register(data) {
  // data: { email, password, name }
  return apiRequest("/auth/register", { method: "POST", body: data });
}
// PUBLIC_INTERFACE
export function oauthStart(provider) {
  // Initiates OAuth login with given provider. Backend will redirect.
  return apiRequest(`/auth/oauth/${provider}`, { method: "GET" });
}

/// PUBLIC_INTERFACE
export function getCurrentUser() {
  return apiRequest("/users/me");
}

/// PUBLIC_INTERFACE
export function updateProfile(profile) {
  return apiRequest("/users/me", { method: "PATCH", body: profile });
}

// === NOTES & ORGANIZATION ===
/// PUBLIC_INTERFACE
export function getNotes(params) {
  return apiRequest("/notes", { params });
}
/// PUBLIC_INTERFACE
export function createNote(note) {
  return apiRequest("/notes", { method: "POST", body: note });
}
/// PUBLIC_INTERFACE
export function updateNote(noteId, updates) {
  return apiRequest(`/notes/${noteId}`, { method: "PATCH", body: updates });
}
/// PUBLIC_INTERFACE
export function deleteNote(noteId) {
  return apiRequest(`/notes/${noteId}`, { method: "DELETE" });
}
/// PUBLIC_INTERFACE
export function getNote(noteId) {
  return apiRequest(`/notes/${noteId}`);
}

// Folders
/// PUBLIC_INTERFACE
export function getFolders() {
  return apiRequest("/folders");
}
/// PUBLIC_INTERFACE
export function createFolder(folder) {
  return apiRequest("/folders", { method: "POST", body: folder });
}
/// PUBLIC_INTERFACE
export function updateFolder(folderId, updates) {
  return apiRequest(`/folders/${folderId}`, { method: "PATCH", body: updates });
}
/// PUBLIC_INTERFACE
export function deleteFolder(folderId) {
  return apiRequest(`/folders/${folderId}`, { method: "DELETE" });
}

// Tags
/// PUBLIC_INTERFACE
export function getTags() {
  return apiRequest("/tags");
}
/// PUBLIC_INTERFACE
export function createTag(name) {
  return apiRequest("/tags", { method: "POST", body: { name } });
}
/// PUBLIC_INTERFACE
export function deleteTag(tagId) {
  return apiRequest(`/tags/${tagId}`, { method: "DELETE" });
}

// Collaboration
/// PUBLIC_INTERFACE
export function inviteCollaborator(noteId, email) {
  return apiRequest(`/notes/${noteId}/collaborators`, { method: "POST", body: { email } });
}
/// PUBLIC_INTERFACE
export function removeCollaborator(noteId, userId) {
  return apiRequest(`/notes/${noteId}/collaborators/${userId}`, { method: "DELETE" });
}
/// PUBLIC_INTERFACE
export function getCollaborators(noteId) {
  return apiRequest(`/notes/${noteId}/collaborators`);
}

// Preferences
/// PUBLIC_INTERFACE
export function getPreferences() {
  return apiRequest("/preferences");
}
/// PUBLIC_INTERFACE
export function updatePreferences(prefs) {
  return apiRequest("/preferences", { method: "PATCH", body: prefs });
}

// Notifications
/// PUBLIC_INTERFACE
export function getNotifications() {
  return apiRequest("/notifications");
}
/// PUBLIC_INTERFACE
export function markNotificationRead(notificationId) {
  return apiRequest(`/notifications/${notificationId}/read`, { method: "POST" });
}

// Export/Import/Share
/// PUBLIC_INTERFACE
export function exportNote(noteId, type = "markdown") {
  return apiRequest(`/notes/${noteId}/export?type=${type}`);
}
/// PUBLIC_INTERFACE
export function shareNote(noteId, shareWith) {
  // shareWith: { email }
  return apiRequest(`/notes/${noteId}/share`, { method: "POST", body: shareWith });
}
