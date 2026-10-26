import { useEffect, useState } from "react";
import FormField from "../components/FormField";
import { usePlayer } from "../context/PlayerContext";
import useDashboardStore from "../store/dashboardStore";
import "./Dashboard.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateProfile(values) {
  const errors = {};
  const name = values.displayName.trim();
  const email = values.email.trim();

  if (!name) {
    errors.displayName = "Please enter a display name.";
  } else if (name.length < 2) {
    errors.displayName = "Display name must contain at least 2 characters.";
  } else if (name.length > 30) {
    errors.displayName = "Display name must be 30 characters or fewer.";
  }

  if (!email) {
    errors.email = "Please enter an email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address, for example player@example.com.";
  }

  return errors;
}

function Dashboard() {
  const { profile, updateProfile, resetProfile } = usePlayer();
  const overview = useDashboardStore((state) => state.overview);
  const loading = useDashboardStore((state) => state.loading);
  const error = useDashboardStore((state) => state.error);
  const lastLoadedAt = useDashboardStore((state) => state.lastLoadedAt);
  const loadOverview = useDashboardStore((state) => state.loadOverview);

  const [formValues, setFormValues] = useState(profile);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    setFormValues(profile);
  }, [profile]);

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSuccessMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateProfile(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage("");
      return;
    }

    updateProfile(formValues);
    setSuccessMessage("Profile saved successfully. Your navbar has been updated too.");
  }

  function handleResetProfile() {
    resetProfile();
    setErrors({});
    setSuccessMessage("Profile reset to the default guest profile.");
  }

  return (
    <section className="dashboard-page page-shell">
      <header className="dashboard-heading">
        <p className="label">Player centre · No. 04</p>
        <h1>Your dashboard.</h1>
        <p className="dashboard-intro">
          Manage your player profile and see how CheckMate is put together.
          This page demonstrates shared state, reusable forms, and asynchronous data loading.
        </p>
      </header>

      <div className="dashboard-layout">
        <section className="dashboard-main-column" aria-label="Project overview">
          <div className="dashboard-section-heading">
            <div>
              <p className="label">Project overview</p>
              <h2>CheckMate at a glance</h2>
            </div>
            <button className="btn btn-ghost dashboard-refresh" type="button" onClick={loadOverview} disabled={loading}>
              {loading ? "Loading…" : "Refresh data ↻"}
            </button>
          </div>

          {loading && (
            <div className="dashboard-state" role="status" aria-live="polite">
              <span className="loading-dot" />
              <div>
                <strong>Loading dashboard data</strong>
                <p>Fetching the project overview from the local JSON file…</p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="dashboard-state dashboard-state-error" role="alert">
              <div>
                <strong>We couldn't load the dashboard.</strong>
                <p>{error}</p>
              </div>
              <button className="btn btn-primary" type="button" onClick={loadOverview}>Try again</button>
            </div>
          )}

          {!loading && !error && overview && (
            <>
              <div className="dashboard-stat-grid">
                {overview.stats.map((stat) => (
                  <article className="dashboard-stat-card" key={stat.id}>
                    <span className="dashboard-stat-label">{stat.label}</span>
                    <strong className="dashboard-stat-value">{stat.value}</strong>
                    <p>{stat.detail}</p>
                  </article>
                ))}
              </div>

              <div className="dashboard-panel">
                <div className="dashboard-panel-heading">
                  <div>
                    <p className="label">Built into the project</p>
                    <h2>Feature checklist</h2>
                  </div>
                  <span className="status-chip">Overview loaded</span>
                </div>
                <div className="dashboard-feature-list">
                  {overview.features.map((feature) => (
                    <article className="dashboard-feature" key={feature.id}>
                      <span className="feature-mark" aria-hidden="true">✓</span>
                      <div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <p className="dashboard-data-note">
                  Data source: <code>/dashboard-data.json</code>
                  {lastLoadedAt && ` · Last loaded at ${new Date(lastLoadedAt).toLocaleTimeString()}`}
                </p>
              </div>
            </>
          )}
        </section>

        <aside className="dashboard-profile-column">
          <section className="dashboard-panel profile-panel">
            <p className="label">Shared profile · Context API</p>
            <div className="profile-avatar" aria-hidden="true">
              {(profile.displayName.trim()[0] || "G").toUpperCase()}
            </div>
            <h2 className="profile-card-name">{profile.displayName}</h2>
            <p className="profile-card-email">{profile.email || "No email saved yet"}</p>
            <p className="profile-context-note">
              This profile is shared between the Dashboard and navigation bar and is saved in this browser.
            </p>
          </section>

          <section className="dashboard-panel profile-form-panel">
            <p className="label">Edit details</p>
            <h2>Player profile</h2>
            <form onSubmit={handleSubmit} noValidate>
              <FormField
                id="displayName"
                label="Display name"
                value={formValues.displayName}
                onChange={handleFieldChange}
                error={errors.displayName}
                placeholder="e.g. Aditya"
                required
                autoComplete="nickname"
                maxLength={30}
              />
              <FormField
                id="email"
                label="Email address"
                type="email"
                value={formValues.email}
                onChange={handleFieldChange}
                error={errors.email}
                placeholder="player@example.com"
                required
                autoComplete="email"
              />
              <button className="btn btn-primary profile-save-button" type="submit">Save profile</button>
              <button className="profile-reset-button" type="button" onClick={handleResetProfile}>Reset to guest profile</button>
              {successMessage && <p className="form-success" role="status">{successMessage}</p>}
            </form>
          </section>
        </aside>
      </div>
    </section>
  );
}

export default Dashboard;
