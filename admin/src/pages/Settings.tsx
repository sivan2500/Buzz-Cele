
import React, { useState } from 'react';
import { Save, Lock, User, Palette, Shield, CheckCircle, XCircle } from 'lucide-react';

const SettingsSection = ({ title, icon: Icon, children }: any) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-8 shadow-sm">
    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50">
      <Icon className="text-gray-400" size={20} />
      <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const RoleRow = ({ role, permissions }: { role: string, permissions: boolean[] }) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
        <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">{role}</td>
        {permissions.map((hasPerm, idx) => (
            <td key={idx} className="px-4 py-4 text-center">
                {hasPerm ? (
                    <CheckCircle size={18} className="mx-auto text-green-500" />
                ) : (
                    <div className="w-4 h-4 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full opacity-50"></div>
                )}
            </td>
        ))}
        <td className="px-4 py-4 text-center">
            <button className="text-xs text-brand-600 dark:text-brand-400 hover:underline">Edit</button>
        </td>
    </tr>
);

const Settings = () => {
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
        <button className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm font-medium">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <SettingsSection title="Design & Branding" icon={Palette}>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Site Name</label>
               <input type="text" defaultValue="BuzzCelebDaily" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
               <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 bg-brand-600 shadow-sm"></div>
                  <input type="text" defaultValue="#db2777" className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white font-mono" />
               </div>
            </div>
            <div className="md:col-span-2">
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Homepage Header Layout</label>
               <div className="grid grid-cols-3 gap-4">
                  <label className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg cursor-pointer text-center">
                     <div className="h-2 bg-gray-300 dark:bg-gray-600 mb-2 w-1/2 mx-auto rounded"></div>
                     <span className="text-xs font-bold text-brand-700 dark:text-brand-400">Centered Logo</span>
                  </label>
                  <label className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg cursor-pointer text-center hover:bg-gray-50 dark:hover:bg-gray-800">
                     <div className="flex justify-between items-center mb-2">
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 w-1/3 rounded"></div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 w-1/3 rounded"></div>
                     </div>
                     <span className="text-xs text-gray-500 dark:text-gray-400">Left Align</span>
                  </label>
                  <label className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg cursor-pointer text-center hover:bg-gray-50 dark:hover:bg-gray-800">
                     <div className="h-2 bg-gray-300 dark:bg-gray-600 mb-2 w-full rounded"></div>
                     <span className="text-xs text-gray-500 dark:text-gray-400">Minimal</span>
                  </label>
               </div>
            </div>
         </div>
      </SettingsSection>

      <SettingsSection title="Team Roles & Permissions" icon={Shield}>
         <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold uppercase text-xs">
                  <tr>
                     <th className="px-4 py-3">Role</th>
                     <th className="px-4 py-3 text-center">Content</th>
                     <th className="px-4 py-3 text-center">Publish</th>
                     <th className="px-4 py-3 text-center">AI Tools</th>
                     <th className="px-4 py-3 text-center">Finance/Ads</th>
                     <th className="px-4 py-3 text-center">System</th>
                     <th className="px-4 py-3 text-center">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <RoleRow role="Admin" permissions={[true, true, true, true, true]} />
                  <RoleRow role="Editor" permissions={[true, true, true, false, false]} />
                  <RoleRow role="Writer" permissions={[true, false, true, false, false]} />
                  <RoleRow role="AI Manager" permissions={[false, false, true, false, true]} />
                  <RoleRow role="Video Producer" permissions={[true, false, true, false, false]} />
                  <RoleRow role="Ads Manager" permissions={[false, false, false, true, false]} />
               </tbody>
            </table>
         </div>
      </SettingsSection>

      <SettingsSection title="Security" icon={Lock}>
         <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
               <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Enforce 2FA for all staff accounts.</p>
               </div>
               <button className="bg-brand-600 w-12 h-6 rounded-full relative transition-colors"><span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></span></button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
               <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Session Timeout</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Auto-logout inactive users.</p>
               </div>
               <select className="border border-gray-300 dark:border-gray-600 rounded text-sm px-2 py-1 bg-white dark:bg-gray-700 dark:text-white">
                  <option>30 Minutes</option>
                  <option>1 Hour</option>
                  <option>4 Hours</option>
               </select>
            </div>
         </div>
      </SettingsSection>

    </div>
  );
};

export default Settings;
